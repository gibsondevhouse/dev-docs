# Stage 7 / Phase 1 / Part 2 — Export Confirmation Modal
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Build the `ExportModal` component: a dialog that shows the destination path and the file count, lets the user pick the output directory, and calls `POST /export` on confirmation.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/components/export/ExportModal.tsx` | Create: export confirmation modal |
| `src/components/chat/ChatView.tsx` | Add Export Plan button + wire ExportModal |
| `src/lib/api.ts` | Add `exportPlan` function |

---

## Exact Requirements

1. Add to `src/lib/api.ts`:

   ```typescript
   import { Plan } from "../types/plan";

   export interface ExportResult {
     files_written: number;
     root_path: string;
   }

   export async function exportPlan(plan: Plan, outputDir: string): Promise<ExportResult> {
     const response = await fetch(`${SIDECAR_URL}/export`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ plan, output_dir: outputDir }),
     });
     if (!response.ok) {
       const text = await response.text();
       throw new Error(`Export failed: ${text}`);
     }
     return response.json();
   }
   ```

2. Create `src/components/export/ExportModal.tsx`:
   - Props: `plan: Plan`, `isOpen: boolean`, `onClose: () => void`, `onSuccess: (result: ExportResult) => void`
   - State: `outputDir: string`, `isExporting: boolean`, `error: string | null`
   - On mount, default `outputDir` to the saved settings `repoPath` + `/plans` (or empty if not set)
   - "Browse" button: opens a Tauri folder picker to let the user select the `plans/` directory
   - Shows a summary: "This will write N files to: {outputDir}/{type}-{nnn}-{name}.md/"
   - "Export" button: calls `exportPlan`, shows spinner while in progress
   - On success: calls `onSuccess` with the result
   - On error: shows error message in red
   - "Cancel" button: calls `onClose`
   - Use shadcn `<Dialog>` component (install: `npx shadcn@latest add dialog`)

3. Add to `ChatView.tsx`:
   - An "Export Plan" button in the top-right of the chat header area
   - Only enabled when `planStore.plan` is not null
   - Clicking it sets `showExportModal = true`
   - Render `<ExportModal>` when `showExportModal` is true
   - `onSuccess`: show a brief success toast ("Plan exported to disk!"), set `showExportModal = false`

---

## What Not to Change

- Do not update `master-plan.md` / `active-plan.md` in this part — that is PT3
- Do not change the file tree generation or planStore

---

## Done When

- [ ] "Export Plan" button appears in the Chat header, disabled when no plan is ready
- [ ] Clicking it opens the modal with the correct output path pre-filled
- [ ] Browse button opens a native folder picker
- [ ] Clicking Export writes all files to disk
- [ ] A success message appears after export
- [ ] An error in the API call shows a red error message in the modal (not a JS exception)
- [ ] Changelog updated
