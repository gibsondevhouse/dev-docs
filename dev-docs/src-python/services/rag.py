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
