# Stage 3 / Phase 1 — Repo Picker UI + Indexing Pipeline
**Plan:** 002 — Chat and RAG

> **For the agent:** This phase builds the Repos screen and the Python indexing endpoint. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

`ReposScreen` shows a folder path input with a Browse button (opens native folder picker) and an Index button that streams progress lines from `POST /index` into a scrollable log area.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | ReposScreen UI (folder picker + index button + progress log) | Not started |
| PT2 | `ph1-pt2/` | Python /index endpoint (LlamaIndex + ChromaDB) | Not started |
| PT3 | `ph1-pt3/` | Wire streaming progress to ReposScreen + persist path in settings | Not started |

---

## Context for This Phase

`ReposScreen.tsx` is `<div className="p-6 text-2xl font-semibold">Repos</div>`. The Python sidecar has no `/index` endpoint yet. The ChromaDB collection persists to the Tauri app data dir — passed from the frontend to the backend as `persist_dir`.

`AppSettings` in `settings.ts` currently has `openrouterApiKey` and `selectedModel`. This phase adds a `repoPath` field so the last-used folder is remembered.

---

## Acceptance Criteria

- [ ] All parts done
- [ ] Browse button opens native macOS folder picker (Tauri dialog plugin)
- [ ] Index button triggers `POST /index` and streams progress lines
- [ ] Progress log auto-scrolls and shows "Done" on completion
- [ ] Re-opening the app shows the last-used folder path
- [ ] ChromaDB files exist on disk in the app data dir after indexing
