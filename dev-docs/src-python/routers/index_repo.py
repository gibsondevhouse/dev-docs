from collections.abc import AsyncIterator

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from services.rag import index_directory

router = APIRouter()


class IndexRequest(BaseModel):
    folder_path: str
    persist_dir: str


async def line_generator(folder_path: str, persist_dir: str) -> AsyncIterator[bytes]:
    try:
        async for line in index_directory(folder_path, persist_dir):
            yield (line + "\n").encode()
    except Exception as exc:
        yield (f"Error: {exc}\n").encode()


@router.post("/index")
async def index_repo(req: IndexRequest) -> StreamingResponse:
    return StreamingResponse(
        line_generator(req.folder_path, req.persist_dir),
        media_type="text/plain",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
