# Stage 3 / Phase 2 / Part 2 — Inject Retrieved Context into /chat System Prompt
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Update the `POST /chat` endpoint to automatically run a RAG search using the user's latest message, then prepend the retrieved context as a system message before forwarding to OpenRouter.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/routers/chat.py` | Update ChatRequest to include persist_dir, add RAG search before streaming |
| `src-python/services/rag.py` | No changes (query_index already exists) |

---

## Exact Requirements

1. Update `ChatRequest` in `src-python/routers/chat.py` to include:
   ```python
   class ChatRequest(BaseModel):
       api_key: str
       model: str
       messages: list[dict]
       persist_dir: str | None = None  # Optional: if None, skip RAG
   ```

2. In the `chat` endpoint handler, before calling `stream_chat`, add context injection:
   ```python
   @router.post("/chat")
   async def chat(req: ChatRequest):
       messages = req.messages.copy()

       # Inject RAG context if a persist_dir is provided and collection exists
       if req.persist_dir:
           user_message = next(
               (m["content"] for m in reversed(messages) if m["role"] == "user"),
               None,
           )
           if user_message:
               from services.rag import query_index
               try:
                   snippets = query_index(user_message, req.persist_dir, top_k=5)
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
                       # Insert context message before the last user message
                       messages.insert(-1, context_msg)
               except Exception:
                   pass  # Gracefully skip if RAG fails

       return StreamingResponse(
           event_generator(req.api_key, req.model, messages),
           media_type="text/event-stream",
           headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
       )
   ```

3. Update the frontend `src/lib/api.ts` `testConnection` function and any future chat calls to include `persist_dir` from settings.

---

## What Not to Change

- Do not change the SSE streaming logic
- Do not make `persist_dir` required — it must remain optional so the test connection call still works

---

## Done When

- [ ] `POST /chat` with a `persist_dir` that has an existing ChromaDB collection includes retrieved context in the messages
- [ ] `POST /chat` without `persist_dir` still works as before (no RAG injection)
- [ ] `POST /chat` with a non-existent `persist_dir` does not crash (graceful skip)
- [ ] Sending a chat message about content in the indexed repo returns a more relevant response
- [ ] Changelog updated
