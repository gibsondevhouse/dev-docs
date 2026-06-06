# Stage 2 / Phase 1 — Chat Layout + Message Rendering
**Plan:** 002 — Chat and RAG

> **For the agent:** This phase creates the visual structure of the Chat screen and the message list component. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The Chat screen renders a two-column layout (chat area left, preview placeholder right). The message list shows user bubbles right-aligned and assistant bubbles left-aligned with rendered markdown. The input area is a placeholder for now.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | ChatMessage type + MessageList component | Not started |
| PT2 | `ph1-pt2/` | ChatView split layout + ChatScreen wiring | Not started |

---

## Context for This Phase

`ChatScreen.tsx` is currently `<div className="p-6 text-2xl font-semibold">Chat</div>`. This phase replaces it via a `ChatView` component. The split is: chat pane (left, `flex-1`) and a preview placeholder (right, fixed `w-80 border-l`). The preview placeholder will be replaced in d-003.

---

## Acceptance Criteria

- [ ] Both parts done
- [ ] Two-column layout renders without overflow or horizontal scrollbar
- [ ] A test assistant message with markdown renders correctly (headers, code block, bold)
- [ ] User bubble is right-aligned, assistant bubble is left-aligned
- [ ] Code blocks in assistant messages have syntax highlighting
- [ ] No TypeScript errors
