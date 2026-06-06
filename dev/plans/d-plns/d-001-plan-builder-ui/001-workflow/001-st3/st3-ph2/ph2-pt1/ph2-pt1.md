# Stage 3 / Phase 2 / Part 1 — FastAPI /search Endpoint
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create the `POST /search` endpoint that queries the ChromaDB collection and returns an array of matching text snippets.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/routers/search.py` | Create: FastAPI router with POST /search |
| `src-python/main.py` | Register the search router |

---

## Exact Requirements

1. Create `src-python/routers/search.py`:

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
       try:
           results = query_index(req.query, req.persist_dir, req.top_k)
           return SearchResponse(results=results)
       except Exception:
           return SearchResponse(results=[])
   ```

2. Register in `src-python/main.py`:
   ```python
   from routers.search import router as search_router
   app.include_router(search_router)
   ```

---

## What Not to Change

- Do not change `services/rag.py` — `query_index` is already implemented
- Do not change the `/chat` or `/index` endpoints in this part (that is PT2)

---

## Done When

- [ ] `POST /search` with `{"query": "test", "persist_dir": "...", "top_k": 3}` returns `{"results": [...]}`
- [ ] If the collection does not exist, returns `{"results": []}` without crashing
- [ ] If `top_k` is not provided, defaults to 5
- [ ] Changelog updated
