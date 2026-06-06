# Stage 3 / Phase 1 / Part 1 — ReposScreen UI
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Replace the `ReposScreen` placeholder with a UI that has a folder path display, a Browse button (Tauri file dialog), an Index button, and a scrollable progress log area. For now, the Index button only logs a placeholder message — the actual API call is wired in PT3.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/screens/ReposScreen.tsx` | Replace placeholder with repo picker UI |
| `src-tauri/Cargo.toml` | Add `tauri-plugin-dialog = "2"` |
| `src-tauri/src/lib.rs` | Register dialog plugin |

---

## Exact Requirements

**Step 1 — Add Tauri dialog plugin.**

Install the npm package: `npm install @tauri-apps/plugin-dialog`

Add to `src-tauri/Cargo.toml` under `[dependencies]`:

```toml
tauri-plugin-dialog = "2"
```

In `src-tauri/src/lib.rs`, add to the Builder chain (before `.setup`):

```rust
.plugin(tauri_plugin_dialog::init())
```

**Step 2 — Replace `src/screens/ReposScreen.tsx`:**

```tsx
import { open } from "@tauri-apps/plugin-dialog";
import { useEffect, useRef, useState } from "react";

export function ReposScreen() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isIndexing, setIsIndexing] = useState(false);
  const [progressLines, setProgressLines] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll progress log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [progressLines]);

  async function handleBrowse() {
    const result = await open({ directory: true, multiple: false });
    if (typeof result === "string") {
      setSelectedPath(result);
    }
  }

  async function handleIndex() {
    if (!selectedPath) return;
    setIsIndexing(true);
    setProgressLines([]);
    // Placeholder — wired to real API in PT3
    setProgressLines(["Indexing not yet connected…"]);
    setIsIndexing(false);
  }

  return (
    <div className="max-w-2xl space-y-6 p-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Repository Folder</label>
        <div className="flex gap-2">
          <div className="flex h-10 flex-1 items-center rounded-md border border-input bg-background px-3 text-sm text-muted-foreground">
            {selectedPath ?? "No folder selected"}
          </div>
          <button
            className="h-10 rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={handleBrowse}
            type="button"
          >
            Browse
          </button>
        </div>
      </div>

      <button
        className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        disabled={!selectedPath || isIndexing}
        onClick={handleIndex}
        type="button"
      >
        {isIndexing ? "Indexing…" : "Index Folder"}
      </button>

      {progressLines.length > 0 && (
        <div
          ref={logRef}
          className="h-48 overflow-y-auto rounded-md border bg-zinc-950 p-3 font-mono text-xs text-zinc-300"
        >
          {progressLines.map((line, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## What Not to Change

- Do not implement the actual `/index` API call yet — that is PT3
- Do not change `settings.ts` or add `repoPath` yet — that is PT3

---

## Done When

- [ ] Repos screen shows the folder path display, Browse button, and Index button
- [ ] Clicking Browse opens a native macOS folder picker
- [ ] Selected path displays in the path field
- [ ] Index button is disabled when no path is selected
- [ ] Clicking Index (with a path) shows the placeholder progress line
- [ ] Tauri dialog plugin compiles without errors (`cargo check` in `src-tauri/`)
- [ ] `npm run build` passes
- [ ] Changelog updated
