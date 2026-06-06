# Stage 3 / Phase 1 / Part 3 — Indexing Progress Stream (Frontend Integration)
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Wire the "Index Folder" button in `ReposScreen` to call `POST /index` and stream progress lines into the UI log area. Show a spinner while indexing, disable the button, and show a "Done" state on completion.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/screens/ReposScreen.tsx` | Add the actual API call + progress streaming to the Index button |
| `src/lib/api.ts` | Add `streamIndex` function |

---

## Exact Requirements

1. Add to `src/lib/api.ts`:

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
     if (!response.ok) throw new Error(`Index failed: ${response.statusText}`);
     const reader = response.body!.getReader();
     const decoder = new TextDecoder();
     while (true) {
       const { value, done } = await reader.read();
       if (done) break;
       const text = decoder.decode(value, { stream: true });
       text.split("\n").filter(Boolean).forEach(onProgress);
     }
   }
   ```

2. To get the Tauri app data directory (for `persistDir`), use:
   ```typescript
   import { appDataDir } from "@tauri-apps/api/path";
   const persistDir = await appDataDir();
   ```
   Install if needed: `npm install @tauri-apps/api`

3. In `ReposScreen.tsx`, wire the Index button:
   - On click: set `isIndexing = true`, clear `indexProgress`, then call `streamIndex`
   - `onProgress` callback: append each line to `indexProgress` array (trigger re-render)
   - On completion: set `isIndexing = false`, append "✓ Done" to progress
   - On error: set `isIndexing = false`, append `"✗ Error: " + message` to progress

4. Store the `selectedPath` to `settings` store so it persists across restarts (add `repoPath` field to `AppSettings` in `settings.ts`, default to `""`).

---

## What Not to Change

- Do not change the Browse button behavior
- Do not change the Python sidecar endpoint

---

## Done When

- [ ] Clicking "Index Folder" starts streaming and progress lines appear in the log area
- [ ] The button is disabled and shows "Indexing..." during the operation
- [ ] Progress completes with "✓ Done" on success
- [ ] An error shows "✗ Error: ..." instead of crashing
- [ ] The repo path is saved to settings and restored on app restart
- [ ] Changelog updated
