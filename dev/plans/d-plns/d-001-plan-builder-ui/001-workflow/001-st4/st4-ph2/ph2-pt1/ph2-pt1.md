# Stage 4 / Phase 2 / Part 1 — chatStore (Zustand, Session-Scoped)
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create a Zustand `chatStore` and migrate `ChatView`'s local message state into it, so chat history persists when the user navigates away and returns.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/store/chatStore.ts` | Create: Zustand store for chat history and streaming state |
| `src/components/chat/ChatView.tsx` | Migrate from local state to chatStore |

---

## Exact Requirements

1. Create `src/store/chatStore.ts`:

   ```typescript
   import { create } from "zustand";
   import { ChatMessage } from "../types/chat";

   interface ChatState {
     messages: ChatMessage[];
     isStreaming: boolean;
     addMessage: (msg: ChatMessage) => void;
     appendToLastMessage: (token: string) => void;
     setStreaming: (v: boolean) => void;
     clearHistory: () => void;
   }

   export const useChatStore = create<ChatState>((set) => ({
     messages: [],
     isStreaming: false,
     addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
     appendToLastMessage: (token) =>
       set((s) => {
         const msgs = [...s.messages];
         const last = msgs[msgs.length - 1];
         if (last) msgs[msgs.length - 1] = { ...last, content: last.content + token };
         return { messages: msgs };
       }),
     setStreaming: (v) => set({ isStreaming: v }),
     clearHistory: () => set({ messages: [], isStreaming: false }),
   }));
   ```

2. Update `src/components/chat/ChatView.tsx`:
   - Remove `const [messages, setMessages] = useState(...)` and `const [isStreaming, setIsStreaming] = useState(...)`
   - Replace with: `const { messages, isStreaming, addMessage, appendToLastMessage, setStreaming, clearHistory } = useChatStore()`
   - Replace all `setMessages(...)` calls with `addMessage(...)` or `appendToLastMessage(...)`
   - Replace `setIsStreaming(...)` with `setStreaming(...)`
   - Add a "Clear chat" `<button>` in the chat header area that calls `clearHistory()`

---

## What Not to Change

- Do not change `InputBar`, `MessageList`, or any other component
- Do not persist the store to disk — it is session-only (no `persist` middleware)

---

## Done When

- [ ] Navigating to Settings and back preserves all chat messages
- [ ] "Clear chat" button resets the history
- [ ] Streaming still works correctly after the migration
- [ ] No TypeScript errors
- [ ] Changelog updated
