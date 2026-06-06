# Stage 4 / Phase 2 — Session Chat History
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase adds Zustand-based session chat history. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

Chat messages are stored in a Zustand store (`chatStore`) so they persist when the user navigates away from the Chat screen and returns. The store is not persisted to disk — it resets when the app is closed.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph2-pt1/` | chatStore (Zustand, session-scoped) | Not started |

---

## Context for This Phase

Without a store, the chat history disappears when the user navigates to Settings and back. The `chatStore` holds the messages array and is consumed by `ChatView`. The store also holds `isStreaming` state to disable the input while the assistant is responding.

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] Navigating to Settings and back to Chat preserves all messages
- [ ] `chatStore` exposes: `messages`, `isStreaming`, `addMessage`, `appendToLastMessage`, `setStreaming`, `clearHistory`
- [ ] A "Clear chat" button in the Chat screen header calls `clearHistory`
- [ ] No TypeScript errors
