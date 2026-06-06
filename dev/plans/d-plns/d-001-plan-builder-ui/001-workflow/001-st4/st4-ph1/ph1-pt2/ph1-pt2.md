# Stage 4 / Phase 1 / Part 2 — InputBar + Streaming Response Display
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create the `InputBar` component and wire it to `POST /chat`. Messages from the user are added to local state, the assistant's streamed response is appended token by token. Auto-scroll to bottom on each new message.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/components/chat/InputBar.tsx` | Create: textarea + send button |
| `src/components/chat/ChatView.tsx` | Update: replace input placeholder with InputBar, manage local message state + streaming |
| `src/lib/api.ts` | Add `streamChat` function |

---

## Exact Requirements

1. Create `src/components/chat/InputBar.tsx`:
   - A `<textarea>` that grows up to 4 lines, then scrolls
   - Send button (icon: `Send` from lucide-react) to the right
   - `onSend(text: string)` callback prop
   - `disabled: boolean` prop — when true, textarea and button are disabled, button shows a spinner
   - Enter key sends (unless Shift is held); Shift+Enter inserts a newline
   - Clear textarea after sending

2. Add `streamChat` to `src/lib/api.ts`:
   ```typescript
   export async function streamChat(
     request: { api_key: string; model: string; messages: { role: string; content: string }[]; persist_dir?: string },
     onChunk: (token: string) => void,
   ): Promise<void> {
     const response = await fetch(`${SIDECAR_URL}/chat`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(request),
     });
     if (!response.ok) throw new Error(`Chat failed: ${response.statusText}`);
     const reader = response.body!.getReader();
     const decoder = new TextDecoder();
     while (true) {
       const { value, done } = await reader.read();
       if (done) break;
       const text = decoder.decode(value, { stream: true });
       for (const line of text.split("\n")) {
         if (line.startsWith("data: ") && line !== "data: [DONE]") {
           try {
             const json = JSON.parse(line.slice(6));
             const token = json.choices?.[0]?.delta?.content;
             if (token) onChunk(token);
           } catch { /* skip malformed chunks */ }
         }
       }
     }
   }
   ```

3. Update `ChatView.tsx`:
   - Replace hardcoded test messages with local state: `const [messages, setMessages] = useState<ChatMessage[]>([])`
   - Add `isStreaming: boolean` state
   - Wire `InputBar.onSend`:
     - Add user message to `messages`
     - Add an empty assistant message to `messages`
     - Call `streamChat`, appending each token to the last message's content
     - Set `isStreaming = false` when done
   - Load settings (API key, model, repo path) from `loadSettings()` before calling `streamChat`
   - Auto-scroll: use a `useEffect` on `messages` to scroll to the bottom `ref` in `MessageList`

---

## What Not to Change

- Do not add Zustand yet — use local state in ChatView for now (Zustand replaces this in PH2)
- Do not change the preview panel — it stays as a placeholder

---

## Done When

- [ ] User can type a message, press Enter or click Send, and see it appear in the chat
- [ ] The assistant's streaming response appears token-by-token in a new bubble
- [ ] Input is disabled while the assistant is responding
- [ ] Message list auto-scrolls to the latest message
- [ ] Pressing Shift+Enter in the textarea inserts a newline instead of sending
- [ ] No console errors during a full conversation
- [ ] Changelog updated
