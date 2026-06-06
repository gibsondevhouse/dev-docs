from collections.abc import AsyncIterator
from typing import Any

import httpx

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"


class OpenRouterError(Exception):
    def __init__(self, status_code: int, message: str) -> None:
        self.status_code = status_code
        self.message = message
        super().__init__(message)


def _error_message(response: httpx.Response, body: bytes) -> str:
    try:
        payload: Any = response.json()
    except ValueError:
        text = body.decode("utf-8", errors="replace").strip()
        return text or response.reason_phrase

    if isinstance(payload, dict):
        error = payload.get("error")
        if isinstance(error, dict):
            message = error.get("message")
            if isinstance(message, str) and message:
                return message
        message = payload.get("message")
        if isinstance(message, str) and message:
            return message

    return response.reason_phrase


async def stream_chat(
    api_key: str,
    model: str,
    messages: list[dict[str, str]],
) -> AsyncIterator[str]:
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "dev-docs",
    }
    payload = {"model": model, "messages": messages, "stream": True}

    async with httpx.AsyncClient(timeout=60.0) as client:
        async with client.stream(
            "POST",
            f"{OPENROUTER_BASE_URL}/chat/completions",
            headers=headers,
            json=payload,
        ) as response:
            if response.status_code >= 400:
                body = await response.aread()
                raise OpenRouterError(
                    response.status_code,
                    _error_message(response, body),
                )

            async for line in response.aiter_lines():
                if line.startswith("data: "):
                    chunk = line[6:]
                    if chunk == "[DONE]":
                        break
                    yield chunk
