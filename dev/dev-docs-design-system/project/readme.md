# dev-docs Design System

> Brand & UI design system for **dev-docs** — a desktop planning tool for vibe-coders. This is the source of truth for building branded interfaces, mocks, slides, and production UI that look and feel like dev-docs.

---

## What dev-docs is

**dev-docs** (the in-app product is called **Plan Builder**) is a Tauri desktop app for *vibe-coders* — people who know what they want to build but struggle to articulate it technically. You have a plain-English conversation with an LLM; it reads your **actual codebase via RAG**; and it generates a structured, **agent-executable plan** in the dev-docs template format. The plan lands on disk ready for an AI coding agent to execute — no manual writing required.

The product is one solo developer's planning methodology, expanded into an app. That methodology — not a flashy visual brand — is the heart of the product, and it shapes the whole design language.

### Core principles (from the product roadmap)
- **Plain English in, structured plans out.** The user never writes plan files by hand.
- **Grounded in real code.** Plans come from what exists on disk, not from memory.
- **Agent-ready output.** Every exported plan is immediately executable by a coding agent.
- **One screen at a time.** The UI stays minimal; nothing is added unless it serves the planning loop.
- **DeepSeek-first.** Optimized for a large context window; other models are secondary.

### The planning methodology (the brand's backbone)
Work is organized as **Plans**, each broken down **Stages → Phases → Parts**.

| Concept | Detail |
| --- | --- |
| Plan **types** | `d` development · `p` polishing · `r` refactoring |
| Plan **statuses** | Queued → Active → Complete (→ Archived) · or Deferred |
| Plan **files** | `active-plan.md` (start here) · `master-plan.md` (inventory) · `roadmap.md` (vision) · `dev-map.md` (sequence) |
| Plan **IDs** | `d-001-plan-builder-ui`, `d-002-chat-and-rag`, `d-003-vibe-planner` |

These concepts have first-class color tokens (see `tokens/colors.css` → `--status-*`, `--type-*`). When you design *for* dev-docs, lean on this vocabulary — it is the product.

---

## Tech & surfaces

| Layer | Technology |
| --- | --- |
| Desktop runtime | Tauri 2 (Rust) |
| Frontend | React 19 + TypeScript + Tailwind CSS + Vite + **shadcn/ui** |
| Icons | **lucide-react** |
| AI sidecar | FastAPI + Python 3.11 |
| Vector store | ChromaDB via LlamaIndex |
| LLM provider | OpenRouter (DeepSeek-first) |

**One product, three screens:** **Chat** (build a plan), **Repos** (index a local codebase), **Settings** (API key + model). A 56px dark icon rail switches between them; the content area is light.

---

## Sources used to build this system

- **GitHub repo:** https://github.com/gibsondevhouse/dev-docs — the Tauri app source, plus the `dev/plans` and `dev/roadmap` methodology docs. Explore it to design more faithfully against the real product.
- **Local codebase:** `dev-docs/` (mounted) — same contents as the repo. Key reads: `dev-docs/src/index.css` (theme tokens), `src/components/**` (chat, layout), `src/screens/**` (Chat/Repos/Settings), `dev/roadmap/roadmap.md`, `dev/plans/README.md` (the methodology).

No Figma was provided. The visual identity below was lifted directly from the codebase (shadcn "slate" theme + the zinc chrome used in `Sidebar.tsx` / log panels).

---

## CONTENT FUNDAMENTALS

How dev-docs writes. The product's voice lives in its docs and its sparse UI copy, and the two are deliberately different registers.

### Two voices
1. **Product UI voice** — terse, lowercase-friendly, functional. Buttons and labels are 1–2 words. Examples from the app: `Browse`, `Index Folder`, `Indexing…`, `Test Connection`, `Connected`, `Save`, `Saved`, `Clear`. Placeholders are quiet and lowercase: `Type a message…`, `No folder selected`, `sk-or-...`. Empty states are plain, full-sentence, and encouraging: *"Start chatting to build a plan."*, *"Plan preview will appear here."*
2. **Methodology / docs voice** — structured, imperative, addressed **to the agent**. Documents open with a blockquote: *"**For the agent:** Read this once to understand the system."* Sentences are direct commands: *"Never work outside the scope of the active plan."* *"Always read `active-plan.md` before starting."* This is the voice of the planning system itself.

### Rules
- **Casing:** Sentence case everywhere — UI labels, headings, doc titles (`Active Plan Status`, `Plan Counts`). Title Case is reserved for proper plan names. Plan IDs and file paths are always lowercase mono: `d-002-chat-and-rag`, `active-plan.md`.
- **Person:** UI speaks to "you" implicitly (imperative: *"Index Folder"*). Docs address "the agent" / "you" directly. The product never refers to itself in the first person.
- **Tone:** Calm, precise, developer-to-developer. No marketing fluff, no exclamation. Confidence comes from structure, not adjectives.
- **Status language:** Use the methodology's exact words — *Queued, Active, Complete, Deferred, Blocked*. Progress is shown with present-participle "…" forms: *Indexing…*, *Testing…*, *Streaming*.
- **Symbols over words for state:** `✓ Done`, `✗ Error: …` in logs (real strings from `ReposScreen.tsx`). Markdown emphasis `_Error: …_` for inline errors.
- **Emoji:** Effectively none in UI. The only glyphs are the log check/cross (`✓` `✗`). Do not introduce decorative emoji.
- **Numbers & counts:** Plans are inventoried with hard counts (*Total plans: 2 · Active: 1*). Be specific and tabular, never vague.

**Microcopy bank:** `Start chatting to build a plan.` · `Plan preview will appear here.` · `No folder selected` · `✓ Done` · `Connected` · `Index Folder` · `Pick up at:` · `Last completed:` · `Definition of Done`

---

## VISUAL FOUNDATIONS

A flat, document-first developer tool. The aesthetic is "structured planning doc meets terminal." Restraint is the brand.

### Color & vibe
- **Light content, dark chrome.** The main workspace is pure white (`--background #ffffff`) with near-black slate text (`--foreground #020817`). The app frame — the 56px sidebar rail — is dark zinc (`--rail-bg #18181b`) with `zinc-400` icons that go white when active. Terminal/log panels are near-black (`--terminal-bg #09090b`) with `zinc-300` mono text.
- **Neutrals do the work.** Two ramps: **slate** for content (the shadcn theme) and **zinc** for chrome and terminals. Color is used almost exclusively for *meaning*, never decoration.
- **Primary = near-black.** The primary action color is slate-900 (`#0f172a`), not a bright hue. Buttons are dark and quiet. There is no saturated "brand accent" — and you should resist inventing one.
- **Semantic color is reserved for state:** success green (`#16a34a`, the "Connected" color), destructive red (`#ef4444`), and the **plan-methodology palette** (`--status-active` blue, `--status-complete` green, `--status-deferred` amber, `--status-blocked` red; `--type-d/p/r`). Chart colors (warm orange→teal→slate→yellow) are the shadcn defaults, for data viz only.
- **Imagery:** none in the product. dev-docs has no photography, no illustration, no gradients. If a marketing surface needs visuals, use the UI itself (plan trees, terminal logs, file paths) as the hero imagery. Do **not** add stock photos or AI gradients.

### Type
- **System-native, no webfonts.** `--font-sans` is the OS UI stack (system-ui / SF / Segoe). `--font-mono` is the native dev-mono stack (SF Mono / Menlo / Consolas). This is intentional and authentic to a native desktop app — and it means zero font loading.
- **`text-sm` (14px) is the body default**, `text-xs` (12px) for logs/meta/badges. The app rarely goes large; screen titles sit at ~14–20px. Headings in *this* design system and on marketing surfaces may scale up (24–48px) but stay tight (`--tracking-tight`).
- **Weight 500 (medium) is the workhorse** for labels, nav, and buttons. 400 for prose, 600 for emphasis.
- **Mono carries identity.** Plan IDs, file paths, counts, terminal output, and code all render in mono — it's the most "branded" type in the system.

### Surfaces, borders & shadows
- **Borders, not shadows.** Surfaces are separated by 1px `--border #e2e8f0` lines — pane dividers, input outlines, the rail's right edge. Shadows are rare and soft (`--shadow-sm/md`), reserved for popovers/dialogs that float above the plane.
- **Cards** = white background + 1px border + `--radius` (8px) corners, usually no shadow. Inputs and buttons use `--radius-md` (6px). Small chips/badges use `--radius-sm` (4px) or full pills for status.
- **Radius is uniform and modest** — 8/6/4px. Nothing is pill-shaped except status badges. No sharp 0px corners, no large 16px+ rounding.
- **Transparency/blur:** minimal. The rail uses subtle `white/10` hover overlays on a dark ground; the active item is a faint `accent/20`. No glassmorphism elsewhere.

### Motion & interaction
- **Quick, functional, no bounce.** Transitions are `transition-colors` at ~160ms with a standard ease. The only looping animation is a spinner (border-spin) for in-flight states (sending a message, indexing).
- **Hover** = a small background fill: dark surfaces lighten (`hover:bg-white/10`), light buttons take an `accent` fill, primary buttons darken slightly (`hover:bg-primary/90`).
- **Focus** = a 2px `--ring` outline with offset (keyboard-visible). Always preserve it.
- **Press/active** = color shift, not scale. Things don't shrink or bounce.
- **Disabled** = `opacity-50`, no pointer.
- **Layout:** fixed 56px rail on the left; content scrolls. In Chat, a fixed 320px preview pane sits on the right, divided by a 1px border. Screen content is padded `p-6` (24px) and max-width-constrained (`max-w-2xl`) for forms.

---

## ICONOGRAPHY

- **System:** [**Lucide**](https://lucide.dev) via `lucide-react` — the single icon set across the app. Clean, consistent 24px line icons at **2px stroke**, rounded caps/joins. Rendered at `h-5 w-5` (20px) in the rail and `h-4 w-4` (16px) inline.
- **Icons in use (real):** `MessageSquare` (Chat), `FolderOpen` (Repos), `Settings` (Settings), `Send` (composer). Reach for Lucide names like `FileText`, `GitBranch`, `Folder`, `Check`, `X`, `Loader2`, `ChevronRight`, `Play`, `Archive` when extending.
- **How to use it here:** Lucide is available from CDN — `https://unpkg.com/lucide-static@latest/icons/<name>.svg` for static HTML, or `lucide-react` in React. Match the app: `stroke-width: 2`, `currentColor`, sized 16–20px. Icons inherit text color (zinc-400 inactive / white active in the rail; slate-500/900 in content).
- **No icon font, no sprite, no PNG icons** ship in the repo — it's all `lucide-react` components. The only non-Lucide glyphs are the terminal status marks `✓` / `✗` (Unicode) in log output.
- **Emoji:** not used. Don't add any.

> The repo ships no logo/wordmark asset. dev-docs presents as plain lowercase wordmark text in the system font. `assets/` documents this; treat the lowercase **`dev-docs`** wordmark (mono or sans, slate-900) as the mark until a real logo is provided.

---

## Index / manifest

Root files:
- **`styles.css`** — global entry point (imports only). Consumers link this.
- **`tokens/`** — `colors.css`, `typography.css`, `spacing.css` (custom properties).
- **`readme.md`** — this guide.
- **`SKILL.md`** — Agent-Skills-compatible entry for using this system in Claude Code.
- **`guidelines/`** — foundation specimen cards (colors, type, spacing, motion, brand).
- **`components/`** — reusable React primitives, grouped:
  - `buttons/` — `Button`, `IconButton`
  - `forms/` — `Field`, `Input`, `Select`, `Textarea`
  - `data-display/` — `Card`, `Badge`, `StatusBadge`, `PlanTypeTag`
- **`ui_kits/plan-builder/`** — high-fidelity, interactive recreation of the dev-docs desktop app (Chat / Repos / Settings).
- **`assets/`** — wordmark + iconography notes.

Starting points (for consuming projects): `Button`, `Input`, `Card`, `StatusBadge`, and the full `Plan Builder app` screen.

> Built from the dev-docs codebase and methodology docs. Explore the repo at https://github.com/gibsondevhouse/dev-docs to design even more faithfully against the real product.
