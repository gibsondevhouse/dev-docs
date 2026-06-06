# Stage 3 / Phase 1 / Part 2 — Python /index Endpoint (LlamaIndex + ChromaDB)
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Create `src-python/services/rag.py` with LlamaIndex + ChromaDB indexing logic, and `src-python/routers/index_repo.py` with a `POST /index` endpoint that streams progress lines as plain text. Register the router in `main.py`.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/services/rag.py` | Create: LlamaIndex + ChromaDB service |
| `src-python/routers/index_repo.py` | Create: FastAPI router with POST /index |
| `src-python/main.py` | Register index_repo router |

---

## Exact Requirements

**Create `src-python/services/rag.py`:**

```python
from __future__ import annotations

import chromadb
from collections.abc import AsyncIterator
from pathlib import Path

from llama_index.core import SimpleDirectoryReader, StorageContext, VectorStoreIndex
from llama_index.vector_stores.chroma import ChromaVectorStore

COLLECTION_NAME = "repo_index"


def _client(persist_dir: str) -> chromadb.PersistentClient:
    Path(persist_dir).mkdir(parents=True, exist_ok=True)
    return chromadb.PersistentClient(path=persist_dir)


async def index_directory(folder_path: str, persist_dir: str) -> AsyncIterator[str]:
    """Yield plain-text progress lines while indexing folder_path into ChromaDB."""
    yield f"Loading files from {folder_path}…"
    reader = SimpleDirectoryReader(
        input_dir=folder_path,
        recursive=True,
        required_exts=[".md", ".txt", ".py", ".ts", ".tsx", ".js", ".jsx", ".json"],
    )
    documents = reader.load_data()
    yield f"Loaded {len(documents)} files. Building index…"

    client = _client(persist_dir)
    collection = client.get_or_create_collection(COLLECTION_NAME)
    vector_store = ChromaVectorStore(chroma_collection=collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    VectorStoreIndex.from_documents(
        documents,
        storage_context=storage_context,
        show_progress=False,
    )
    yield f"Done — {len(documents)} documents indexed."


def query_index(query: str, persist_dir: str, top_k: int = 5) -> list[str]:
    """Return top-k matching text snippets. Returns [] if collection does not exist."""
    try:
        client = _client(persist_dir)
        collection = client.get_or_create_collection(COLLECTION_NAME)
        results = collection.query(query_texts=[query], n_results=top_k)
        return results.get("documents", [[]])[0]
    except Exception:
        return []
```

**Create `src-python/routers/index_repo.py`:**

```python
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
```

**Register in `src-python/main.py`** — add after the existing chat router import:

```python
from routers.index_repo import router as index_repo_router
app.include_router(index_repo_router)
```

---

## What Not to Change

- Do not change `openrouter.py`, `chat.py`, or the existing main.py structure beyond adding the router
- Do not add a `/search` endpoint yet — that is ST3 PH2 PT1

---

## Done When

- [ ] `POST /index` with `{"folder_path": "/path/to/dir", "persist_dir": "/tmp/test-chroma"}` streams progress lines
- [ ] ChromaDB files appear in `persist_dir` after indexing
- [ ] Running the endpoint a second time does not crash (idempotent)
- [ ] Tested against a small folder (e.g., `dev-docs/` or any markdown folder)
- [ ] Changelog updated
