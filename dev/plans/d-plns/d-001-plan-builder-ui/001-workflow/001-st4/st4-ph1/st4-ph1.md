# Stage 4 / Phase 1 — Chat Component
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase builds the actual chat UI: message bubbles and the input bar. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The Chat screen renders a scrollable list of user/assistant messages and a text input bar with a send button. Assistant messages are rendered as markdown. The UI streams tokens in real time as the sidecar sends them.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | MessageList component (user/assistant bubbles) | Not started |
| PT2 | `ph1-pt2/` | InputBar + streaming response display | Not started |

---

## Context for This Phase

`src/screens/ChatScreen.tsx` is currently a placeholder. This phase replaces it with the full chat layout. The chat layout is split: left ~60% for chat, right ~40% for the preview panel (which is a placeholder until ST6).

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] User messages appear right-aligned in a distinct bubble style
- [ ] Assistant messages appear left-aligned with markdown rendering
- [ ] Code blocks in assistant messages have syntax highlighting
- [ ] The message list auto-scrolls to the latest message
- [ ] The input bar is a multi-line textarea (grows to 4 lines max) with a Send button
- [ ] Pressing Enter sends the message; Shift+Enter adds a newline
- [ ] The input is disabled and shows a spinner while the assistant is responding
- [ ] Streaming tokens appear progressively in the latest assistant bubble
