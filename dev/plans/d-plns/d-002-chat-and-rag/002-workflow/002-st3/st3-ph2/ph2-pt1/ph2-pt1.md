# Stage 3 / Phase 2 / Part 1 — Python /search Endpoint
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Create `src-python/routers/search.py` with a `POST /search` endpoint that queries the ChromaDB collection and returns an array of matching text snippets. Register the router.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/routers/search.py` | Create: FastAPI router with POST /search |
| `src-python/main.py` | Register search router |

---

## Exact Requirements

**Create `src-python/routers/search.py`:**

```python
from fastapi import APIRouter
from pydantic import BaseModel

from services.rag import query_index

router = APIRouter()


class SearchRequest(BaseModel):
    query: str
    persist_dir: str
    top_k: int = 5


class SearchResponse(BaseModel):
    results: list[str]


@router.post("/search", response_model=SearchResponse)
def search(req: SearchRequest) -> SearchResponse:
    results = query_index(req.query, req.persist_dir, req.top_k)
    return SearchResponse(results=results)
```

Note: `query_index` already handles all exceptions internally and returns `[]` on failure — no additional try/except needed here.

**Register in `src-python/main.py`:**

```python
from routers.search import router as search_router
app.include_router(search_router)
```

---

## What Not to Change

- Do not change `rag.py`, `chat.py`, or any other existing file

---

## Done When

- [ ] `POST /search` with `{"query": "test", "persist_dir": "..."}` returns `{"results": [...]}`
- [ ] With a non-existent `persist_dir`, returns `{"results": []}` without a 500 error
- [ ] `top_k` defaults to 5 when not provided
- [ ] Changelog updated
