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
