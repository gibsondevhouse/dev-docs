# Stage 2 / Phase 2 / Part 1 — FastAPI /chat Endpoint (OpenRouter Streaming Proxy)
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create the `POST /chat` endpoint in the Python sidecar that accepts a list of messages and an API key, forwards the request to OpenRouter's chat completions API, and streams the response back as Server-Sent Events (SSE).

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/routers/chat.py` | Create: FastAPI router with POST /chat |
| `src-python/services/openrouter.py` | Create: OpenRouter HTTP client (httpx, streaming) |
| `src-python/main.py` | Register the chat router |

---

## Exact Requirements

1. Create `src-python/services/openrouter.py`:

   ```python
   import httpx
   from typing import AsyncIterator

   OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

   async def stream_chat(
       api_key: str,
       model: str,
       messages: list[dict],
   ) -> AsyncIterator[str]:
       headers = {
           "Authorization": f"Bearer {api_key}",
           "Content-Type": "application/json",
           "HTTP-Referer": "http://localhost",
           "X-Title": "Plan Builder",
       }
       payload = {"model": model, "messages": messages, "stream": True}
       async with httpx.AsyncClient(timeout=60.0) as client:
           async with client.stream(
               "POST",
               f"{OPENROUTER_BASE_URL}/chat/completions",
               headers=headers,
               json=payload,
           ) as response:
               response.raise_for_status()
               async for line in response.aiter_lines():
                   if line.startswith("data: "):
                       chunk = line[6:]
                       if chunk == "[DONE]":
                           break
                       yield chunk
   ```

2. Create `src-python/routers/chat.py`:

   ```python
   from fastapi import APIRouter
   from fastapi.responses import StreamingResponse
   from pydantic import BaseModel
   from services.openrouter import stream_chat

   router = APIRouter()

   class ChatRequest(BaseModel):
       api_key: str
       model: str
       messages: list[dict]

   async def event_generator(api_key: str, model: str, messages: list[dict]):
       async for chunk in stream_chat(api_key, model, messages):
           yield f"data: {chunk}\n\n"
       yield "data: [DONE]\n\n"

   @router.post("/chat")
   async def chat(req: ChatRequest):
       return StreamingResponse(
           event_generator(req.api_key, req.model, req.messages),
           media_type="text/event-stream",
           headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
       )
   ```

3. Register the router in `src-python/main.py`:
   ```python
   from routers.chat import router as chat_router
   app.include_router(chat_router)
   ```

---

## What Not to Change

- Do not add RAG context injection yet — the system prompt and context injection come in ST3
- Do not log `api_key` at any point

---

## Done When

- [ ] `POST /chat` with `{"api_key": "...", "model": "anthropic/claude-3.5-sonnet", "messages": [{"role": "user", "content": "Say hello"}]}` returns a streaming SSE response
- [ ] Each SSE event is a valid JSON chunk from the OpenRouter API
- [ ] `[DONE]` is sent as the final event
- [ ] An invalid API key results in a non-500 error message (httpx raises `HTTPStatusError` which bubbles to a 4xx response — handle gracefully)
- [ ] Sidecar restarts cleanly after adding the router
- [ ] Changelog updated
