# Stage 3 / Phase 1 — Repo Picker + Indexing Pipeline
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase builds the Repos screen UI (folder picker + index button) and the Python indexing endpoint. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The Repos screen lets the user pick a local folder and click "Index". Indexing progress streams back via WebSocket and displays in the UI. The index is stored in ChromaDB on disk and survives app restarts.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | Folder picker UI (Tauri file dialog) | Not started |
| PT2 | `ph1-pt2/` | FastAPI /index endpoint (LlamaIndex + ChromaDB) | Not started |
| PT3 | `ph1-pt3/` | Indexing progress stream (WebSocket → UI) | Not started |

---

## Context for This Phase

`src/screens/ReposScreen.tsx` is a placeholder. This phase replaces it with the indexing UI. The Python `services/rag.py` service will handle LlamaIndex + ChromaDB. The index is stored at a path passed in by the frontend (the Tauri app data directory).

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] Repos screen shows a folder path input + Browse button + Index button
- [ ] Clicking Browse opens a native macOS folder picker
- [ ] Clicking Index triggers `POST /index` and shows real-time progress
- [ ] Index completes successfully for a markdown-heavy folder (e.g., `dev-docs/`)
- [ ] ChromaDB collection persists to disk; restarting the app does not wipe it
- [ ] No errors during indexing of files with special characters in names
