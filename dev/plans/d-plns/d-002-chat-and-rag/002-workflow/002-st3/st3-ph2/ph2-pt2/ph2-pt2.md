# Stage 3 / Phase 2 / Part 2 — Inject Context into /chat + Update ChatView
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Update `POST /chat` in the Python sidecar to accept an optional `persist_dir` and, when present, inject retrieved RAG context as a system message. Update `ChatView` to pass `persistDir` from settings to `streamChat`.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/routers/chat.py` | Add `persist_dir` to `ChatRequest`, inject RAG context |
| `src/components/chat/ChatView.tsx` | Pass `persistDir` from settings to `streamChat` |

---

## Exact Requirements

**Step 1 — Update `src-python/routers/chat.py`.**

Update `ChatRequest` to add the optional field:

```python
class ChatRequest(BaseModel):
    api_key: str
    model: str
    messages: list[dict[str, str]]
    persist_dir: str | None = None
```

In the `chat` handler, inject context before calling `stream_chat`. Add this block between the request receipt and the `stream = stream_chat(...)` line:

```python
messages = req.messages.copy()

if req.persist_dir:
    # Find the last user message to use as the search query
    user_query = next(
        (m["content"] for m in reversed(messages) if m["role"] == "user"),
        None,
    )
    if user_query:
        from services.rag import query_index
        snippets = query_index(user_query, req.persist_dir, top_k=5)
        if snippets:
            context_text = "\n\n---\n\n".join(snippets)
            context_msg = {
                "role": "system",
                "content": (
                    "The following excerpts from the indexed repository "
                    "may be relevant to the user's message:\n\n"
                    f"{context_text}"
                ),
            }
            # Insert context before the last user message
            messages = messages[:-1] + [context_msg, messages[-1]]

stream = stream_chat(req.api_key, req.model, messages)
```

Replace the existing `stream = stream_chat(req.api_key, req.model, req.messages)` with `stream = stream_chat(req.api_key, req.model, messages)`.

**Step 2 — Update `src/components/chat/ChatView.tsx`.**

In `handleSend`, load settings and pass `repoPath` as `persistDir` to `streamChat`:

```typescript
const settings = await loadSettings();
await streamChat(
  {
    apiKey: settings.openrouterApiKey,
    model: settings.selectedModel,
    messages: history,
    persistDir: settings.repoPath || undefined,
  },
  (token) => { appendToLastMessage(token); },
);
```

Replace the existing `streamChat` call (which doesn't pass `persistDir`) with this version.

---

## What Not to Change

- Do not change the streaming SSE logic in `chat.py`
- Do not change `testConnection` in `api.ts` — it does not pass `persist_dir` and that is correct

---

## Done When

- [ ] Sending a chat message about content in the indexed folder returns a more relevant response
- [ ] Chat works with `persist_dir = null` (no RAG) when no repo is indexed — no regression
- [ ] `persist_dir` pointing to a non-existent path does not crash the sidecar
- [ ] No API key logged in sidecar stdout
- [ ] `npm run build` passes
- [ ] Changelog updated
