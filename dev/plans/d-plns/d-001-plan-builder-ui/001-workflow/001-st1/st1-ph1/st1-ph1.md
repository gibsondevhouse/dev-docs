# Stage 1 / Phase 1 — Tauri + Python Sidecar Setup
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase sets up the two-process architecture: a Tauri desktop window (React frontend) and a Python FastAPI sidecar. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

A Tauri v2 project exists with a React + TypeScript + Tailwind frontend. A Python FastAPI sidecar runs on `127.0.0.1:37421` and is spawned automatically when the app starts.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | Init Tauri + Vite + React + Tailwind project | Done |
| PT2 | `ph1-pt2/` | Create Python FastAPI sidecar skeleton | Done |
| PT3 | `ph1-pt3/` | Wire sidecar to Tauri startup/shutdown | Done |

---

## Context for This Phase

The project does not exist yet. PT1 creates the project root. PT2 adds the Python backend directory inside it. PT3 connects them so the Python process starts when Tauri starts and stops when Tauri closes.

The sidecar communicates with the frontend over HTTP. No Rust/Python bridge — just plain HTTP calls from the React frontend to `http://127.0.0.1:37421`.

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] `npm run tauri dev` opens a native desktop window
- [ ] The Python sidecar process starts alongside the app
- [ ] `GET http://127.0.0.1:37421/health` returns `{"status": "ok"}`
- [ ] No TypeScript or Rust errors on startup
- [ ] No new errors introduced
