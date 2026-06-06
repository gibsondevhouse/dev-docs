# Stage 6 / Phase 1 — Preview Panel (File Tree + File Viewer)
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase builds the right-side preview panel: a file tree showing the plan's folder structure and a viewer that renders the markdown content of a selected file. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The preview panel on the Chat screen renders a clickable file tree derived from `planStore`. Clicking a file in the tree shows its markdown content in a viewer below. The panel updates live as `planStore` changes.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | FileTree component | Not started |
| PT2 | `ph1-pt2/` | FileViewer component (rendered markdown) | Not started |

---

## Context for This Phase

`planStore.plan` contains the structured plan data. This phase must derive the file system tree from it — i.e., convert the `Plan` type into the folder/file structure that would be written to disk. The mapping from plan JSON to file structure is:

```
{type}-{nnn}-{name}.md/
├── {nnn}.md
├── {nnn}-context/
│   ├── {nnn}-context.md
│   └── {nnn}-changelog.md
└── {nnn}-workflow/
    └── {nnn}-{stId}/
        └── {phId}/
            └── {ptId}/
```

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] The preview panel shows the full plan folder tree derived from `planStore.plan`
- [ ] Tree is collapsible (folders can be opened/closed)
- [ ] Clicking a file node shows its generated markdown content in the viewer below
- [ ] The plan summary file (`{nnn}.md`) content is derived from the plan description and stages
- [ ] Context and changelog files have template-derived starter content
- [ ] The tree updates when `planStore.plan` changes
