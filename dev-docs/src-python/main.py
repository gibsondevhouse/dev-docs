from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.chat import router as chat_router
from routers.index_repo import router as index_repo_router
from routers.search import router as search_router

app = FastAPI(title="Plan Builder Sidecar", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:1420", "tauri://localhost"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


app.include_router(chat_router)
app.include_router(index_repo_router)
app.include_router(search_router)
