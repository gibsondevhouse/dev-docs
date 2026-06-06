# Stage 6 / Phase 1 / Part 1 — FileTree Component
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create the `FileTree` component and a `buildFileTree` utility that converts a `Plan` object into a nested file/folder tree structure. The tree is rendered in the preview panel with expand/collapse on folders and click-to-select on files.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/lib/planToFileTree.ts` | Create: convert Plan → tree structure |
| `src/components/preview/FileTree.tsx` | Create: collapsible file tree component |
| `src/components/preview/PreviewPanel.tsx` | Create: wrapper that uses FileTree and FileViewer |
| `src/components/chat/ChatView.tsx` | Replace preview placeholder with `<PreviewPanel />` |

---

## Exact Requirements

1. Create `src/lib/planToFileTree.ts` — define the tree node type and build function:

   ```typescript
   import { Plan } from "../types/plan";

   export interface TreeNode {
     name: string;
     path: string;          // unique path used as key and for file content lookup
     type: "folder" | "file";
     children?: TreeNode[];
   }

   export function buildFileTree(plan: Plan): TreeNode {
     const n = plan.number;
     const root: TreeNode = {
       name: `${plan.type}-${n}-${plan.name}.md`,
       path: `root`,
       type: "folder",
       children: [
         { name: `${n}.md`, path: `${n}.md`, type: "file" },
         {
           name: `${n}-context`,
           path: `${n}-context`,
           type: "folder",
           children: [
             { name: `${n}-context.md`, path: `${n}-context/${n}-context.md`, type: "file" },
             { name: `${n}-changelog.md`, path: `${n}-context/${n}-changelog.md`, type: "file" },
           ],
         },
         {
           name: `${n}-workflow`,
           path: `${n}-workflow`,
           type: "folder",
           children: plan.stages.map((st) => ({
             name: `${n}-${st.id}`,
             path: `${n}-workflow/${n}-${st.id}`,
             type: "folder" as const,
             children: [
               { name: `${n}-${st.id}.md`, path: `${n}-workflow/${n}-${st.id}/${n}-${st.id}.md`, type: "file" as const },
               ...st.phases.map((ph) => ({
                 name: ph.id,
                 path: `${n}-workflow/${n}-${st.id}/${ph.id}`,
                 type: "folder" as const,
                 children: [
                   { name: `${ph.id}.md`, path: `${n}-workflow/${n}-${st.id}/${ph.id}/${ph.id}.md`, type: "file" as const },
                   ...ph.parts.map((pt) => ({
                     name: pt.id,
                     path: `${n}-workflow/${n}-${st.id}/${ph.id}/${pt.id}`,
                     type: "folder" as const,
                     children: [
                       { name: `${pt.id}.md`, path: `${n}-workflow/${n}-${st.id}/${ph.id}/${pt.id}/${pt.id}.md`, type: "file" as const },
                     ],
                   })),
                 ],
               })),
             ],
           })),
         },
       ],
     };
     return root;
   }
   ```

2. Create `src/components/preview/FileTree.tsx`:
   - Accepts `root: TreeNode` and `selectedPath: string | null` and `onSelect: (path: string) => void` props
   - Renders recursively using a `TreeNodeView` internal component
   - Folders show a chevron (collapsed/expanded) + folder icon; click toggles expand/collapse
   - Files show a file icon; click calls `onSelect(node.path)`
   - Selected file is highlighted (bg-accent)
   - All folders start expanded by default

3. Create `src/components/preview/PreviewPanel.tsx`:
   - Subscribes to `usePlanStore()`
   - If `plan` is null: shows "Plan preview will appear here." placeholder
   - If `plan` is set: renders `<FileTree>` (top ~60%) and `<FileViewer>` placeholder (bottom ~40%)
   - Manages `selectedPath` state locally

4. Update `ChatView.tsx` preview column to render `<PreviewPanel />` instead of the placeholder.

---

## What Not to Change

- Do not implement `FileViewer` yet — render a placeholder `<div>` for the selected file path
- Do not change `chatStore` or `planStore`

---

## Done When

- [ ] Preview panel renders the full folder tree for a plan from `planStore`
- [ ] Folders expand and collapse on click
- [ ] Clicking a file highlights it and logs its path to console
- [ ] Tree is empty/placeholder when no plan is in store
- [ ] No TypeScript errors
- [ ] Changelog updated
