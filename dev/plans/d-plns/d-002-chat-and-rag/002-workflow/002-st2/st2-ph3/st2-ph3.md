# Stage 2 / Phase 3 — Zustand chatStore
**Plan:** 002 — Chat and RAG

> **For the agent:** This phase migrates chat state from local React state to a session-scoped Zustand store. Complete the single part. When done, update the changelog.

---

## Phase Goal

Chat history survives navigation away from and back to the Chat screen. A Zustand `chatStore` replaces the local state in `ChatView`.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph3-pt1/` | chatStore + migrate ChatView | Not started |

---

## Context for This Phase

PH2 must be complete. Install Zustand: `npm install zustand`. The store is session-only (no `persist` middleware). `ChatView` currently manages `messages` and `isStreaming` as `useState` — this part replaces those with the store.

---

## Acceptance Criteria

- [ ] Part done
- [ ] Navigating to Settings and back preserves all messages
- [ ] "Clear chat" button in the Chat screen header calls `clearHistory()`
- [ ] Streaming still works correctly after migration
- [ ] No TypeScript errors
