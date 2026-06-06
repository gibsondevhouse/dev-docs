# Stage 2 / Phase 2 / Part 2 — streamChat in api.ts + Wire to ChatView
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Add `streamChat` to `api.ts`, then update `ChatView` to:
- Replace the hardcoded test messages with real local state
- Replace the input placeholder with `<InputBar>`
- Call `streamChat` when the user sends a message, appending tokens to the assistant bubble in real time

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/lib/api.ts` | Add `streamChat` function |
| `src/components/chat/ChatView.tsx` | Replace test messages + input placeholder with real logic |

---

## Exact Requirements

**Step 1 — Add `streamChat` to `src/lib/api.ts`** (add below `testConnection`, do not remove or change `testConnection`):

```typescript
import type { ChatMessage } from "@/types/chat";

export interface StreamChatRequest {
  apiKey: string;
  model: string;
  messages: Array<{ role: string; content: string }>;
  persistDir?: string; // Optional — used in ST3. Ignore for now.
}

export async function streamChat(
  request: StreamChatRequest,
  onChunk: (token: string) => void,
): Promise<void> {
  const response = await fetch(`${SIDECAR_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: request.apiKey,
      model: request.model,
      messages: request.messages,
      ...(request.persistDir ? { persist_dir: request.persistDir } : {}),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    for (const line of text.split("\n")) {
      if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
      try {
        const json = JSON.parse(line.slice(6)) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const token = json.choices?.[0]?.delta?.content;
        if (token) onChunk(token);
      } catch {
        // skip malformed chunks
      }
    }
  }
}
```

Note: `ChatMessage` is imported for the type but the function accepts a plain array. Add the import at the top if needed. If `ChatMessage` is not used directly, you can omit that import line — just make sure `StreamChatRequest` is exported.

**Step 2 — Rewrite `src/components/chat/ChatView.tsx`** with real state and streaming. Replace the entire file:

```tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid"; // install if needed: npm install nanoid
import { InputBar } from "@/components/chat/InputBar";
import { MessageList } from "@/components/chat/MessageList";
import { streamChat } from "@/lib/api";
import { loadSettings } from "@/lib/settings";
import type { ChatMessage } from "@/types/chat";

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = { id: nanoid(), role: "user", content: text };
      const assistantMsg: ChatMessage = { id: nanoid(), role: "assistant", content: "" };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsStreaming(true);

      try {
        const settings = await loadSettings();
        const history = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        await streamChat(
          { apiKey: settings.openrouterApiKey, model: settings.selectedModel, messages: history },
          (token) => {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last?.role === "assistant") {
                updated[updated.length - 1] = { ...last, content: last.content + token };
              }
              return updated;
            });
          },
        );
      } catch (err) {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === "assistant") {
            updated[updated.length - 1] = {
              ...last,
              content: `_Error: ${err instanceof Error ? err.message : "Unknown error"}_`,
            };
          }
          return updated;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [messages],
  );

  function handleClear() {
    setMessages([]);
  }

  return (
    <div className="flex h-full min-h-0">
      {/* Chat pane */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center justify-between border-b px-4">
          <span className="text-sm font-medium">Chat</span>
          <button
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={handleClear}
            type="button"
          >
            Clear
          </button>
        </div>
        <MessageList messages={messages} ref={bottomRef} />
        <InputBar disabled={isStreaming} onSend={handleSend} />
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

Install `nanoid` if not already present: `npm install nanoid`

---

## What Not to Change

- Do not change `InputBar` or `MessageList`
- Do not change the preview pane placeholder
- Do not touch Python sidecar files

---

## Done When

- [ ] The Chat screen shows an empty state with "Start chatting to build a plan."
- [ ] Typing a message and pressing Enter sends it and shows the user bubble
- [ ] The assistant response streams in token-by-token
- [ ] Input is disabled during streaming; Send button shows a spinner
- [ ] An API error shows as a red italic message in the assistant bubble
- [ ] "Clear" button resets all messages
- [ ] `npm run build` passes
- [ ] Changelog updated
