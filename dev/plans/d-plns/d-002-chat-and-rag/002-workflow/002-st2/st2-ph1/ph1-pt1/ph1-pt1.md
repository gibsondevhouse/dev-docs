# Stage 2 / Phase 1 / Part 1 — ChatMessage Type + MessageList Component
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Define the `ChatMessage` type and create the `MessageList` component. Install and configure the markdown rendering dependencies.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/types/chat.ts` | Create: ChatMessage interface |
| `src/components/chat/MessageList.tsx` | Create: scrollable message list |
| `tailwind.config.js` | Add typography plugin |

---

## Exact Requirements

**Step 1 — Install dependencies** (run from the project root):

```bash
npm install react-markdown rehype-highlight highlight.js
npm install -D @tailwindcss/typography
```

**Step 2 — Update `tailwind.config.js`.**
Find the `plugins` array. It currently contains `require('tailwindcss-animate')`. Replace with:

```js
plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
```

**Step 3 — Create `src/types/chat.ts`:**

```typescript
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
```

**Step 4 — Create `src/components/chat/MessageList.tsx`:**

```tsx
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import type { ChatMessage } from "@/types/chat";
import { forwardRef } from "react";

type MessageListProps = {
  messages: ChatMessage[];
};

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  function MessageList({ messages }, bottomRef) {
    if (messages.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Start chatting to build a plan.
        </div>
      );
    }

    return (
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={[
              "max-w-[75%] rounded-lg px-4 py-2 text-sm",
              msg.role === "user"
                ? "ml-auto bg-zinc-800 text-white"
                : "mr-auto bg-zinc-100 text-zinc-900",
            ].join(" ")}
          >
            {msg.role === "assistant" ? (
              <div className="prose prose-sm prose-zinc max-w-none dark:prose-invert">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {msg.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{msg.content}</p>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    );
  },
);
```

---

## What Not to Change

- Do not create `ChatView` or `ChatScreen` yet — that is PT2
- Do not modify any existing files other than `tailwind.config.js`

---

## Done When

- [ ] `src/types/chat.ts` exists with the `ChatMessage` interface
- [ ] `src/components/chat/MessageList.tsx` exists and compiles
- [ ] `tailwind.config.js` includes the typography plugin
- [ ] `npm run build` passes with no errors
- [ ] Changelog updated
