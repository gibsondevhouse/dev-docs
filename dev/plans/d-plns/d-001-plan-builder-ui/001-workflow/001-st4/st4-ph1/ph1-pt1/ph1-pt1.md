# Stage 4 / Phase 1 / Part 1 — MessageList Component
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create the `MessageList` component that renders a scrollable list of chat messages with distinct styling for user vs assistant messages. Assistant messages are rendered as markdown with syntax-highlighted code blocks.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/components/chat/MessageList.tsx` | Create: scrollable message list |
| `src/components/chat/ChatView.tsx` | Create: screen shell with split layout (chat left, preview placeholder right) |
| `src/screens/ChatScreen.tsx` | Replace placeholder with `<ChatView />` |

---

## Exact Requirements

1. Define the message type in a shared location `src/types/chat.ts`:
   ```typescript
   export interface ChatMessage {
     id: string;
     role: "user" | "assistant";
     content: string;
   }
   ```

2. Create `src/components/chat/MessageList.tsx`:
   - Accepts `messages: ChatMessage[]` as a prop
   - Renders each message in a `<div>` with appropriate alignment:
     - User: right-aligned, dark bubble (e.g. `bg-zinc-800 text-white`)
     - Assistant: left-aligned, lighter bubble (e.g. `bg-zinc-100 text-zinc-900`)
   - Assistant content uses `<ReactMarkdown>` with `rehype-highlight` plugin
   - Import highlight.js CSS in this file: `import "highlight.js/styles/github-dark.css"`
   - Add a `ref` to the bottom of the list for auto-scroll (used in PT2)
   - If `messages` is empty, show a centered placeholder: "Start chatting to build a plan."

3. Create `src/components/chat/ChatView.tsx`:
   - Two-column flex layout: chat column (flex-1, min-w-0) | preview column (w-80, border-left)
   - Chat column: `<MessageList>` (takes remaining height) + input bar placeholder (fixed at bottom)
   - Preview column: placeholder `<div>` with "Plan preview will appear here" text
   - Import and use `MessageList` with a hardcoded test array of 2 messages (one user, one assistant) for now

4. Update `src/screens/ChatScreen.tsx` to render `<ChatView />`.

---

## What Not to Change

- Do not add the input bar yet — that is PT2
- Do not add Zustand store yet — that is PH2

---

## Done When

- [ ] Chat screen shows the split layout (chat area + preview placeholder)
- [ ] Two test messages render: user bubble right, assistant bubble left
- [ ] Markdown in the test assistant message renders correctly (try `**bold** and \`code\``)
- [ ] Code blocks in assistant messages have syntax highlighting
- [ ] No TypeScript errors
- [ ] Changelog updated
