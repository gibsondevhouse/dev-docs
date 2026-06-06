from collections.abc import AsyncIterator

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from services.openrouter import OpenRouterError, stream_chat

router = APIRouter()


class ChatRequest(BaseModel):
    api_key: str
    model: str
    messages: list[dict[str, str]]
    persist_dir: str | None = None


async def event_generator(
    first_chunk: str | None,
    stream: AsyncIterator[str],
) -> AsyncIterator[str]:
    if first_chunk is not None:
        yield f"data: {first_chunk}\n\n"

    async for chunk in stream:
        yield f"data: {chunk}\n\n"

    yield "data: [DONE]\n\n"


@router.post("/chat")
async def chat(req: ChatRequest) -> StreamingResponse:
    messages = req.messages.copy()

    # Ensure English responses and prepend system message if none exists
    if not any(m.get("role") == "system" for m in messages):
        messages = [{"role": "system", "content": "Always respond in English."}] + messages

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

    try:
        first_chunk = await anext(stream, None)
    except OpenRouterError as error:
        raise HTTPException(status_code=error.status_code, detail=error.message) from error

    return StreamingResponse(
        event_generator(first_chunk, stream),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
