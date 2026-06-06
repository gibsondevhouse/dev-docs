/* dev-docs Plan Builder — screens & shell. Reads primitives from window. */

(() => {
const { useState, useRef, useEffect } = React;
const { Icon, Button, IconButton, Field, Input, Select, Textarea, Card, Badge, StatusBadge, PlanTypeTag } = window;

/* ============================ Sidebar rail ============================ */
function Rail({ route, onNavigate }) {
  return (
    <aside className="rail">
      <div className="rail__wordmark">dev<br/>docs</div>
      <nav className="rail__nav">
        <IconButton variant="rail" active={route === "chat"} label="Chat" onClick={() => onNavigate("chat")}><Icon name="message-square" /></IconButton>
        <IconButton variant="rail" active={route === "repos"} label="Repos" onClick={() => onNavigate("repos")}><Icon name="folder-open" /></IconButton>
        <div className="rail__spacer" />
        <IconButton variant="rail" active={route === "settings"} label="Settings" onClick={() => onNavigate("settings")}><Icon name="settings" /></IconButton>
      </nav>
    </aside>
  );
}

/* ============================ Chat screen ============================ */
// A canned plan the assistant "generates" from a plain-English request.
const PLAN = {
  id: "d-004-plan-export",
  name: "Plan Export to Disk",
  type: "d",
  summary: "Lets the user export the in-progress plan as a ready-to-run folder, then updates the plan registries.",
  reply: "Got it. I read your codebase and found the existing `planStore` and the export endpoint stub. Here's a structured plan in the dev-docs format:\n\n**Plan d-004 — Plan Export to Disk**\nTransforms the live preview into an exportable plan folder. Stage 1 wires a Python `/export` endpoint that writes the `PlanNode` tree to disk in the template structure. Stage 2 adds an export confirmation modal. Stage 3 updates `master-plan.md` and `active-plan.md` automatically.\n\nThe plan is in the preview panel — review the tree, then Export.",
  files: [
    { path: "004.md", depth: 0, kind: "file", title: "Plan d-004 — Plan Export to Disk",
      body: "# Plan 004 — Plan Export to Disk\n\n## What This Plan Does\nLets the user export the in-progress plan as a ready-to-execute folder on disk, in the exact dev-docs template structure, then updates the plan registries.\n\n## Definition of Done\n- [ ] Export writes the full plan folder to the chosen directory\n- [ ] Folder follows the stages → phases → parts structure\n- [ ] master-plan.md and active-plan.md are updated after export" },
    { path: "004-context/", depth: 0, kind: "dir" },
    { path: "004-context.md", depth: 1, kind: "file", title: "Context",
      body: "# 004 — Codebase Context\n\nKey files inherited from d-003:\n- `src/store/planStore.ts` — the PlanNode tree\n- `src-python/export.py` — endpoint stub (incomplete)\n\nConstraint: write only inside the user-chosen output directory." },
    { path: "004-workflow/", depth: 0, kind: "dir" },
    { path: "004-st1/", depth: 1, kind: "dir" },
    { path: "st1-export-endpoint.md", depth: 2, kind: "file", title: "Stage 1 — Export endpoint",
      body: "# Stage 1 — Export Endpoint\n\n**Part 1** — Python `/export` route that serializes the PlanNode tree.\n**Part 2** — Write files in template order (stages → phases → parts).\n**Part 3** — Return the written path to the frontend." },
    { path: "004-st2/", depth: 1, kind: "dir" },
    { path: "st2-confirm-modal.md", depth: 2, kind: "file", title: "Stage 2 — Confirm modal",
      body: "# Stage 2 — Export Confirmation\n\nA modal previews the destination path and file count before writing. Confirm triggers the endpoint; cancel is a no-op." },
    { path: "004-st3/", depth: 1, kind: "dir" },
    { path: "st3-registry-update.md", depth: 2, kind: "file", title: "Stage 3 — Registry update",
      body: "# Stage 3 — Registry Update\n\nAfter a successful export, append the new plan to `master-plan.md` and set it active in `active-plan.md`." },
  ],
};

function renderMarkdownLite(md) {
  // tiny markdown: # / ## headings, **bold**, `code`, - lists
  const lines = md.split("\n");
  const out = [];
  let list = null;
  const inline = (t) => {
    const parts = [];
    let rest = t, key = 0;
    const re = /(\*\*[^*]+\*\*|`[^`]+`)/;
    let m;
    while ((m = rest.match(re))) {
      if (m.index > 0) parts.push(rest.slice(0, m.index));
      const tok = m[0];
      if (tok.startsWith("**")) parts.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
      else parts.push(<code key={key++}>{tok.slice(1, -1)}</code>);
      rest = rest.slice(m.index + tok.length);
    }
    parts.push(rest);
    return parts;
  };
  lines.forEach((ln, i) => {
    if (/^- /.test(ln) || /^- \[/.test(ln)) { list = list || []; list.push(<li key={i}>{inline(ln.replace(/^- (\[.\] )?/, ""))}</li>); return; }
    if (list) { out.push(<ul key={"u" + i}>{list}</ul>); list = null; }
    if (/^# /.test(ln)) out.push(<h3 key={i} style={{ fontSize: "var(--text-base)" }}>{inline(ln.slice(2))}</h3>);
    else if (/^## /.test(ln)) out.push(<h3 key={i}>{inline(ln.slice(3))}</h3>);
    else if (ln.trim() === "") out.push(<div key={i} style={{ height: 6 }} />);
    else out.push(<p key={i}>{inline(ln)}</p>);
  });
  if (list) out.push(<ul key="uend">{list}</ul>);
  return out;
}

const STARTER_PROMPTS = [
  "Add a way to export the plan to disk",
  "Plan a settings screen redesign",
  "Refactor the chat store",
];
const FILE_COUNT = PLAN.files.filter((f) => f.kind === "file").length;

function ArtifactPanel({ onClose, openFile, setOpenFile }) {
  return (
    <div className="artpanel">
      <div className="artpanel__head">
        <PlanTypeTag type={PLAN.type} size={22} />
        <span className="artpanel__title">{PLAN.id}</span>
        <StatusBadge status="queued" />
        <IconButton variant="default" label="Close plan" onClick={onClose}><Icon name="x" size={18} /></IconButton>
      </div>
      <div className="artpanel__body">
        <div className="tree" style={{ marginBottom: 14 }}>
          {PLAN.files.map((f, i) => (
            <div key={i}
              className={"tree__row " + (f.kind === "file" ? "is-file " : "") + (openFile && openFile.path === f.path && f.kind === "file" ? "is-active" : "")}
              style={{ paddingLeft: 6 + f.depth * 14 }}
              onClick={() => f.kind === "file" && setOpenFile(f)}>
              <Icon name={f.kind === "dir" ? "folder" : "file-text"} size={14} style={{ color: f.kind === "dir" ? "var(--slate-400)" : "var(--status-active)" }} />
              <span>{f.path}</span>
            </div>
          ))}
        </div>
        {openFile && (
          <Card pad>
            <div className="md md--sm">{renderMarkdownLite(openFile.body)}</div>
          </Card>
        )}
        <Button block style={{ marginTop: 14 }} startIcon={<Icon name="download" size={16} style={{ color: "#fff" }} />}>Export plan to disk</Button>
      </div>
    </div>
  );
}

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [planReady, setPlanReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [openFile, setOpenFile] = useState(null);
  const scrollRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  function autoGrow() {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }

  function send(preset) {
    const text = (preset != null ? preset : value).trim();
    if (!text || streaming) return;
    setValue("");
    if (taRef.current) taRef.current.style.height = "auto";
    setMessages((m) => [...m, { role: "user", content: text }, { role: "assistant", content: "" }]);
    setStreaming(true);
    setPlanReady(false);
    setPanelOpen(false);

    const tokens = PLAN.reply.match(/\S+\s*/g) || [];
    let i = 0;
    const timer = setInterval(() => {
      i++;
      const partial = tokens.slice(0, i).join("");
      setMessages((m) => { const c = m.slice(); c[c.length - 1] = { role: "assistant", content: partial }; return c; });
      if (i >= tokens.length) {
        clearInterval(timer);
        setStreaming(false);
        setPlanReady(true);
        setOpenFile(PLAN.files.find((f) => f.kind === "file"));
      }
    }, 34);
  }

  function onKey(e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }
  function newChat() { setMessages([]); setValue(""); setStreaming(false); setPlanReady(false); setPanelOpen(false); setOpenFile(null); }

  const hasMessages = messages.length > 0;

  const composer = (
    <div className="composer2">
      <textarea ref={taRef} className="composer2__ta" rows={1} value={value} disabled={streaming}
        placeholder="Describe what you want to build…"
        onChange={(e) => { setValue(e.target.value); autoGrow(); }} onKeyDown={onKey} />
      <div className="composer2__bar">
        <button className="composer2__chip" type="button">
          <Icon name="sliders" size={13} /> deepseek-chat <Icon name="chevron-down" size={13} />
        </button>
        <span className="composer2__spacer" />
        <button className="composer2__send" aria-label="Send" disabled={streaming || !value.trim()} onClick={() => send()}>
          {streaming ? <span className="dd-spin" style={{ color: "#fff", width: 14, height: 14 }} /> : <Icon name="arrow-up" size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="chat2">
      <div className="topbar">
        <span className="topbar__title">{planReady ? <Badge variant="secondary" mono>{PLAN.id}</Badge> : "New plan"}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {planReady && !panelOpen && <button className="linkbtn" onClick={() => setPanelOpen(true)}>Show plan</button>}
          {hasMessages && <IconButton variant="default" label="New chat" onClick={newChat}><Icon name="plus" size={18} /></IconButton>}
        </div>
      </div>

      {!hasMessages ? (
        <div className="chat2__hero">
          <div className="hero__greeting">What are you building?</div>
          <div className="hero__sub">Describe it in plain English — dev-docs reads your repo and writes the plan.</div>
          <div className="hero__composer">{composer}</div>
          <div className="hero__prompts">
            {STARTER_PROMPTS.map((p) => (
              <button key={p} className="prompt-chip" onClick={() => send(p)}>{p}</button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="chat2__scroll" ref={scrollRef}>
            <div className="chat2__col">
              {messages.map((m, idx) => {
                const isLast = idx === messages.length - 1;
                const isAssistant = m.role === "assistant";
                return (
                  <div key={idx} className={"turn turn--" + m.role}>
                    <div className={"turn__avatar turn__avatar--" + (isAssistant ? "a" : "u")}>
                      {isAssistant ? "d" : <Icon name="user" size={15} />}
                    </div>
                    <div className="turn__body">
                      <div className="turn__name">{isAssistant ? "dev-docs" : "You"}</div>
                      {isAssistant ? (
                        <div className="md turn__text">
                          {renderMarkdownLite(m.content)}
                          {streaming && isLast && <span className="caret" />}
                          {planReady && isLast && (
                            <button className={"artifact" + (panelOpen ? " is-open" : "")} onClick={() => setPanelOpen(true)}>
                              <span className="artifact__icon"><Icon name="file-text" size={18} /></span>
                              <span className="artifact__meta">
                                <span className="artifact__title">{PLAN.id}</span>
                                <span className="artifact__sub">Plan · {FILE_COUNT} files · stages → phases → parts</span>
                              </span>
                              <span className="artifact__open">Open</span>
                            </button>
                          )}
                          {!streaming && (
                            <div className="turn__actions">
                              <button className="iconaction" aria-label="Copy"><Icon name="copy" size={15} /></button>
                              <button className="iconaction" aria-label="Retry"><Icon name="rotate-cw" size={15} /></button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="md turn__text">{m.content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="chat2__dock">
            {composer}
            <div className="composer__hint">dev-docs grounds every plan in your indexed repo. Plans are agent-ready.</div>
          </div>
        </>
      )}

      {panelOpen && planReady && <ArtifactPanel onClose={() => setPanelOpen(false)} openFile={openFile} setOpenFile={setOpenFile} />}
    </div>
  );
}

/* ============================ Repos screen ============================ */
const INDEX_LINES = [
  { t: "$ indexing /Users/dev/plan-builder", c: "dim" },
  { t: "→ scanning files… 142 found" },
  { t: "→ chunking source (3,910 chunks)" },
  { t: "→ embedding via DeepSeek" },
  { t: "→ writing to ChromaDB" },
  { t: "✓ Done", c: "ok" },
];
function ReposScreen() {
  const [path, setPath] = useState("/Users/dev/plan-builder");
  const [indexing, setIndexing] = useState(false);
  const [lines, setLines] = useState([]);
  const logRef = useRef(null);
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [lines]);

  function index() {
    if (!path || indexing) return;
    setIndexing(true); setLines([]);
    let i = 0;
    const timer = setInterval(() => {
      setLines((l) => [...l, INDEX_LINES[i]]);
      i++;
      if (i >= INDEX_LINES.length) { clearInterval(timer); setIndexing(false); }
    }, 520);
  }

  return (
    <div className="screen screen--narrow">
      <div className="stack">
        <Field label="Repository Folder" hint="dev-docs reads this codebase via RAG to ground every plan.">
          <div className="row">
            <Input value={path} mono onChange={(e) => setPath(e.target.value)} placeholder="No folder selected" style={{ flex: 1 }} />
            <Button variant="secondary" startIcon={<Icon name="folder-open" size={16} />}>Browse</Button>
          </div>
        </Field>
        <div>
          <Button onClick={index} loading={indexing} disabled={!path}>{indexing ? "Indexing…" : "Index Folder"}</Button>
        </div>
        {lines.length > 0 && (
          <div className="terminal" ref={logRef}>
            {lines.map((l, i) => <div key={i} className={l.c || ""}>{l.t}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ Settings screen ============================ */
function SettingsScreen() {
  const [key, setKey] = useState("");
  const [model, setModel] = useState("deepseek-chat");
  const [saved, setSaved] = useState(false);
  const [test, setTest] = useState("idle"); // idle | testing | success | error
  useEffect(() => { if (!saved) return; const t = setTimeout(() => setSaved(false), 2000); return () => clearTimeout(t); }, [saved]);

  function save(e) { e.preventDefault(); setSaved(true); }
  function runTest() {
    if (!key) { setTest("error"); return; }
    setTest("testing");
    setTimeout(() => setTest("success"), 1100);
  }

  return (
    <div className="screen screen--narrow">
      <form className="stack" onSubmit={save}>
        <Field label="OpenRouter API Key">
          <Input type="password" value={key} mono placeholder="sk-or-..." onChange={(e) => setKey(e.target.value)} />
        </Field>
        <Field label="Model">
          <Select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="deepseek-chat">deepseek-chat</option>
            <option value="deepseek-reasoner">deepseek-reasoner</option>
            <option value="anthropic/claude-3.5-sonnet">anthropic/claude-3.5-sonnet</option>
          </Select>
        </Field>
        <div className="stack stack--sm">
          <div><Button type="submit">Save</Button></div>
          <div className="statusline">{saved && <span className="muted">Saved</span>}</div>
        </div>
        <div className="stack stack--sm">
          <div><Button type="button" variant="secondary" onClick={runTest} loading={test === "testing"}>{test === "testing" ? "Testing…" : "Test Connection"}</Button></div>
          <div className="statusline" aria-live="polite">
            {test === "success" && <span className="ok">Connected</span>}
            {test === "error" && <span className="err">No API key — enter your key and click Save first.</span>}
          </div>
        </div>
      </form>
    </div>
  );
}

/* ============================ App shell ============================ */
function App() {
  const [route, setRoute] = useState("chat");
  const title = route === "chat" ? "Chat" : route === "repos" ? "Repos" : "Settings";
  return (
    <div className="app">
      <Rail route={route} onNavigate={setRoute} />
      <div className="main">
        {route === "chat" && <ChatScreen />}
        {route === "repos" && (<><div className="topbar"><span className="topbar__title">{title}</span></div><ReposScreen /></>)}
        {route === "settings" && (<><div className="topbar"><span className="topbar__title">{title}</span></div><SettingsScreen /></>)}
      </div>
    </div>
  );
}

window.PlanBuilderApp = App;
})();
