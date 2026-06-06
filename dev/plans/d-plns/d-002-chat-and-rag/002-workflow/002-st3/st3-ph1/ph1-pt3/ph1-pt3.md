# Stage 3 / Phase 1 / Part 3 — Wire Streaming Progress to ReposScreen + Persist Path
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Wire the "Index Folder" button to call `POST /index` and stream progress lines into the log. Add `repoPath` to `AppSettings` so the selected folder persists across restarts.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/lib/settings.ts` | Add `repoPath` field to `AppSettings`, `loadSettings`, `saveSettings` |
| `src/lib/api.ts` | Add `streamIndex` function |
| `src/screens/ReposScreen.tsx` | Wire Index button to `streamIndex`, load/save path from settings |

---

## Exact Requirements

**Step 1 — Update `src/lib/settings.ts`.**

Add `repoPath: string` to the `AppSettings` interface:

```typescript
export interface AppSettings {
  openrouterApiKey: string;
  selectedModel: string;
  repoPath: string;
}
```

In `loadSettings()`, add after the `model` line:

```typescript
const repoPath = (await store.get<string>("repoPath")) ?? "";
return { openrouterApiKey: key, selectedModel: model, repoPath };
```

In `saveSettings()`, add:

```typescript
await store.set("repoPath", settings.repoPath);
```
(add it alongside the existing `selectedModel` store.set call, before the final `store.save()`)

**Step 2 — Add `streamIndex` to `src/lib/api.ts`** (add below `streamChat`):

```typescript
export async function streamIndex(
  folderPath: string,
  persistDir: string,
  onProgress: (line: string) => void,
): Promise<void> {
  const response = await fetch(`${SIDECAR_URL}/index`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder_path: folderPath, persist_dir: persistDir }),
  });
  if (!response.ok) {
    throw new Error(`Index failed: HTTP ${response.status}`);
  }
  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    for (const line of text.split("\n")) {
      if (line.trim()) onProgress(line.trim());
    }
  }
}
```

**Step 3 — Update `src/screens/ReposScreen.tsx`.**

Add imports:

```typescript
import { appDataDir } from "@tauri-apps/api/path";
import { streamIndex } from "@/lib/api";
import { loadSettings, saveSettings } from "@/lib/settings";
```

On mount, load the saved `repoPath`:

```typescript
useEffect(() => {
  loadSettings()
    .then((s) => { if (s.repoPath) setSelectedPath(s.repoPath); })
    .catch(() => {});
}, []);
```

Save path when it changes (add a separate `useEffect` watching `selectedPath`):

```typescript
useEffect(() => {
  if (!selectedPath) return;
  loadSettings()
    .then((s) => saveSettings({ ...s, repoPath: selectedPath }))
    .catch(() => {});
}, [selectedPath]);
```

Replace the `handleIndex` function body:

```typescript
async function handleIndex() {
  if (!selectedPath) return;
  setIsIndexing(true);
  setProgressLines([]);
  try {
    const persistDir = await appDataDir();
    await streamIndex(
      selectedPath,
      persistDir,
      (line) => setProgressLines((prev) => [...prev, line]),
    );
    setProgressLines((prev) => [...prev, "✓ Done"]);
  } catch (err) {
    setProgressLines((prev) => [
      ...prev,
      `✗ Error: ${err instanceof Error ? err.message : "Unknown error"}`,
    ]);
  } finally {
    setIsIndexing(false);
  }
}
```

---

## What Not to Change

- Do not change `testConnection` or `streamChat` in `api.ts`
- Do not change the Repos screen layout — only the logic

---

## Done When

- [ ] Clicking "Index Folder" streams progress lines into the log area
- [ ] Log shows "✓ Done" on success or "✗ Error: ..." on failure
- [ ] Index button shows "Indexing…" and is disabled while in progress
- [ ] Selected folder path is saved and restored on app restart
- [ ] ChromaDB collection exists in the Tauri app data dir after indexing
- [ ] `npm run build` passes
- [ ] Changelog updated
