# Stage 7 / Phase 1 — Export Flow
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase implements the full export flow: FastAPI endpoint, confirmation modal, write to disk, and post-export registry updates. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The user can export the built plan to their local dev-docs repo. An Export button opens a modal showing the destination and file tree. On confirmation, the Python sidecar writes all plan files to disk. `master-plan.md` and `active-plan.md` are then updated to register the new plan.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | FastAPI /export endpoint (write files to disk) | Not started |
| PT2 | `ph1-pt2/` | Export confirmation modal (UI) | Not started |
| PT3 | `ph1-pt3/` | Post-export: update master-plan.md and active-plan.md | Not started |

---

## Context for This Phase

The `Plan` JSON from `planStore` contains all data needed to generate the file tree. The `/export` endpoint receives the plan JSON plus the output directory path, generates the file content (same logic as `planToFileContent.ts` but in Python), and writes the folder structure to disk.

The output directory is the `plans/` folder of the user's dev-docs repo (e.g., `/Users/user/Dev/dev-docs/dev-docs/plans/`). The user selects this path via a Tauri file dialog in the modal.

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] "Export Plan" button in Chat screen is active only when `planStore.plan` is set
- [ ] Clicking it opens a modal with output directory picker and file tree summary
- [ ] Confirming writes the full folder structure to disk correctly
- [ ] Files match the template format (headers, tables, placeholder sections)
- [ ] `master-plan.md` is updated with the new plan entry
- [ ] `active-plan.md` is updated with the new plan as active
- [ ] A success toast/notification appears after export
