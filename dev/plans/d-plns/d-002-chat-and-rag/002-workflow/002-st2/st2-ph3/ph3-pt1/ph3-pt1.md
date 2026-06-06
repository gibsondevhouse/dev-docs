# Stage 2 / Phase 3 / Part 1 — chatStore + Migrate ChatView
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Install Zustand, create `src/store/chatStore.ts`, and migrate `ChatView` to use the store instead of local `useState` for `messages` and `isStreaming`.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/store/chatStore.ts` | Create: Zustand store |
| `src/components/chat/ChatView.tsx` | Replace useState with chatStore |

---

## Exact Requirements

**Step 1 — Install:**

```bash
npm install zustand
```

**Step 2 — Create `src/store/chatStore.ts`:**

```typescript
import { create } from "zustand";
import type { ChatMessage } from "@/types/chat";

interface ChatState {
  messages: ChatMessage[];
  isStreaming: boolean;
  addMessage: (msg: ChatMessage) => void;
  appendToLastMessage: (token: string) => void;
  setStreaming: (v: boolean) => void;
  updateLastMessageOnError: (errorText: string) => void;
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
  updateLastMessageOnError: (errorText) =>
    set((s) => {
      const msgs = [...s.messages];
      const last = msgs[msgs.length - 1];
      if (last?.role === "assistant") {
        msgs[msgs.length - 1] = { ...last, content: errorText };
      }
      return { messages: msgs };
    }),
  clearHistory: () => set({ messages: [], isStreaming: false }),
}));
```

**Step 3 — Update `src/components/chat/ChatView.tsx`.**
Replace the local `useState` declarations and their usages with the store. The full changes:

- Remove: `const [messages, setMessages] = useState<ChatMessage[]>([]);`
- Remove: `const [isStreaming, setIsStreaming] = useState(false);`
- Add at the top of the function body:
  ```typescript
  const { messages, isStreaming, addMessage, appendToLastMessage, setStreaming, updateLastMessageOnError, clearHistory } = useChatStore();
  ```

- In `handleSend`:
  - Replace `setMessages((prev) => [...prev, userMsg, assistantMsg])` with:
    ```typescript
    addMessage(userMsg);
    addMessage(assistantMsg);
    ```
  - Replace `setIsStreaming(true)` with `setStreaming(true)`
  - Replace the `onChunk` callback body:
    ```typescript
    (token) => { appendToLastMessage(token); },
    ```
  - Replace the `catch` block `setMessages(...)` call with:
    ```typescript
    updateLastMessageOnError(`_Error: ${err instanceof Error ? err.message : "Unknown error"}_`);
    ```
  - Replace `setIsStreaming(false)` in `finally` with `setStreaming(false)`

- Replace `handleClear` body with `clearHistory()`

- Remove the `useCallback` dependency array `[messages]` — the handler no longer closes over `messages` directly. Instead, read messages from the store inside the function:
  ```typescript
  const history = useChatStore.getState().messages
    .filter((m) => m.role !== "assistant" || m.content !== "")
    .map((m) => ({ role: m.role, content: m.content }));
  ```
  Note: use `useChatStore.getState()` (outside React rendering) to read the snapshot at send-time. This avoids stale closures and removes the need for `useCallback([messages])`.

  The `handleSend` function becomes a plain `async function` without `useCallback`:
  ```typescript
  async function handleSend(text: string) { ... }
  ```

---

## What Not to Change

- Do not add `persist` middleware to the store
- Do not change `InputBar`, `MessageList`, `chatStore` after creating it
- Do not change any other file

---

## Done When

- [ ] `src/store/chatStore.ts` exists
- [ ] Chat still works: send a message, get a streaming response
- [ ] Navigate to Settings, then back to Chat — all messages are preserved
- [ ] "Clear" button resets history
- [ ] `npm run build` passes with no TypeScript errors
- [ ] Changelog updated
