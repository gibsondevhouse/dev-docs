# Stage 2 / Phase 1 / Part 2 — ChatView Split Layout + ChatScreen Wiring
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Create `ChatView` with the two-column split layout (chat left, preview placeholder right) and wire it into `ChatScreen`. Add two hardcoded test messages so the layout is visible before the input bar exists.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/components/chat/ChatView.tsx` | Create: split layout with MessageList + preview placeholder |
| `src/screens/ChatScreen.tsx` | Replace placeholder with `<ChatView />` |

---

## Exact Requirements

**Create `src/components/chat/ChatView.tsx`:**

```tsx
import { useRef } from "react";
import { MessageList } from "@/components/chat/MessageList";
import type { ChatMessage } from "@/types/chat";

// Temporary test messages — removed in PH2 when real state is wired
const TEST_MESSAGES: ChatMessage[] = [
  { id: "1", role: "user", content: "What is this app?" },
  {
    id: "2",
    role: "assistant",
    content:
      "This is **Plan Builder** — an AI-powered tool for designing structured development plans.\n\n```typescript\nconst greeting = 'Hello, world!';\nconsole.log(greeting);\n```",
  },
];

export function ChatView() {
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full min-h-0">
      {/* Chat pane */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Header */}
        <div className="flex h-12 shrink-0 items-center border-b px-4">
          <span className="text-sm font-medium">Chat</span>
        </div>
        {/* Messages */}
        <MessageList messages={TEST_MESSAGES} ref={bottomRef} />
        {/* Input placeholder — replaced in PH2 */}
        <div className="h-16 shrink-0 border-t bg-muted/30" />
      </div>

      {/* Preview pane placeholder */}
      <div className="flex w-80 shrink-0 flex-col border-l">
        <div className="flex h-12 shrink-0 items-center border-b px-4">
          <span className="text-sm font-medium text-muted-foreground">Preview</span>
        </div>
        <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
          Plan preview will appear here.
        </div>
      </div>
    </div>
  );
}
```

**Update `src/screens/ChatScreen.tsx`:**

```tsx
import { ChatView } from "@/components/chat/ChatView";

export function ChatScreen() {
  return <ChatView />;
}
```

---

## What Not to Change

- Do not add the input bar — that is PH2
- Do not modify `AppShell`, `Sidebar`, or routing

---

## Done When

- [ ] Chat screen shows the two-column layout
- [ ] Two test messages render (user right-aligned, assistant left-aligned)
- [ ] The assistant message markdown renders with bold and a highlighted code block
- [ ] Preview placeholder shows "Plan preview will appear here."
- [ ] No layout overflow or horizontal scrollbar
- [ ] `npm run build` passes
- [ ] Changelog updated
