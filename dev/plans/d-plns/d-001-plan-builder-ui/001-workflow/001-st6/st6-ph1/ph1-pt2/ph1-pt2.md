# Stage 6 / Phase 1 / Part 2 — FileViewer Component (Rendered Markdown)
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create a `generateFileContent` utility that produces the markdown content for each file in the plan tree, and a `FileViewer` component that renders the content of the selected file as formatted markdown.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/lib/planToFileContent.ts` | Create: generate markdown content for each file path |
| `src/components/preview/FileViewer.tsx` | Create: renders markdown content of the selected file |
| `src/components/preview/PreviewPanel.tsx` | Wire FileViewer to selectedPath + file content |

---

## Exact Requirements

1. Create `src/lib/planToFileContent.ts` — a function that takes a `Plan` and a `path` string and returns the markdown content for that file:

   The content follows the same template as the real plan files. Key mappings:
   - `{nnn}.md`: the master plan brief (plan name, description, workflow map, stages at a glance, definition of done)
   - `{nnn}-context/{nnn}-context.md`: context file (current state, key decisions, constraints — filled with plan data)
   - `{nnn}-context/{nnn}-changelog.md`: empty changelog with the log entry template
   - `{nnn}-workflow/{nnn}-{stId}/{nnn}-{stId}.md`: stage file (stage name, goal, phases table)
   - `{nnn}-workflow/.../{phId}/{phId}.md`: phase file (phase name, goal, parts table)
   - `{nnn}-workflow/.../{ptId}/{ptId}.md`: part file (task description from part.description, done-when checklist)

   Return `"// Unknown file"` for unrecognized paths.

2. Create `src/components/preview/FileViewer.tsx`:
   - Accepts `plan: Plan`, `selectedPath: string | null`
   - If no path selected: shows "Select a file to preview"
   - If path selected: calls `generateFileContent(plan, selectedPath)` and renders via `<ReactMarkdown>` with the `@tailwindcss/typography` prose class (`prose prose-sm`)
   - Install `@tailwindcss/typography` if not already added: `npm install @tailwindcss/typography` and add `require('@tailwindcss/typography')` to `tailwind.config.js` plugins

3. Update `PreviewPanel.tsx` to pass `plan` and `selectedPath` to `<FileViewer>`.

---

## What Not to Change

- Do not change `FileTree` or `planStore`
- Do not change any Python sidecar files

---

## Done When

- [ ] Clicking a file in the tree shows its rendered markdown content in the viewer below
- [ ] The main plan brief file (`{nnn}.md`) renders with the correct plan name, description, and stage list
- [ ] Stage and phase files show the correct name and goal
- [ ] The changelog file shows the empty log template
- [ ] Markdown is rendered with proper formatting (headings, lists, code blocks)
- [ ] No console errors
- [ ] Changelog updated
