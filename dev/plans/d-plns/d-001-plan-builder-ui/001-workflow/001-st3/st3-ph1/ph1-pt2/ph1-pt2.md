# Stage 3 / Phase 1 / Part 2 — FastAPI /index Endpoint (LlamaIndex + ChromaDB)
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create the `POST /index` endpoint in the Python sidecar and the `services/rag.py` service that uses LlamaIndex to ingest all files from a given folder path into a ChromaDB vector store.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/services/rag.py` | Create: LlamaIndex + ChromaDB indexing service |
| `src-python/routers/index_repo.py` | Create: FastAPI router with POST /index |
| `src-python/main.py` | Register the index_repo router |

---

## Exact Requirements

1. Create `src-python/services/rag.py`:

   ```python
   import chromadb
   from pathlib import Path
   from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, StorageContext
   from llama_index.vector_stores.chroma import ChromaVectorStore
   from typing import AsyncIterator

   COLLECTION_NAME = "repo_index"

   def get_chroma_client(persist_dir: str) -> chromadb.PersistentClient:
       return chromadb.PersistentClient(path=persist_dir)

   async def index_directory(
       folder_path: str,
       persist_dir: str,
   ) -> AsyncIterator[str]:
       """Index all files in folder_path. Yields progress messages."""
       yield f"Loading files from {folder_path}..."
       reader = SimpleDirectoryReader(
           input_dir=folder_path,
           recursive=True,
           required_exts=[".md", ".txt", ".py", ".ts", ".tsx", ".js", ".json"],
       )
       documents = reader.load_data()
       yield f"Loaded {len(documents)} documents. Building index..."

       client = get_chroma_client(persist_dir)
       collection = client.get_or_create_collection(COLLECTION_NAME)
       vector_store = ChromaVectorStore(chroma_collection=collection)
       storage_context = StorageContext.from_defaults(vector_store=vector_store)

       VectorStoreIndex.from_documents(
           documents,
           storage_context=storage_context,
           show_progress=False,
       )
       yield f"Indexing complete. {len(documents)} documents indexed."

   def query_index(query: str, persist_dir: str, top_k: int = 5) -> list[str]:
       client = get_chroma_client(persist_dir)
       collection = client.get_or_create_collection(COLLECTION_NAME)
       results = collection.query(query_texts=[query], n_results=top_k)
       return results.get("documents", [[]])[0]
   ```

2. Create `src-python/routers/index_repo.py`:
   - Accept `POST /index` with body `{"folder_path": str, "persist_dir": str}`
   - Return a `StreamingResponse` that yields progress lines as plain text (one per line, flushed)
   - Use the `index_directory` async generator from `services/rag.py`

3. Register the router in `src-python/main.py`.

---

## What Not to Change

- Do not add the WebSocket progress streaming yet — this endpoint just returns streamed plain text lines (simple `StreamingResponse`)
- Do not change the `/chat` endpoint

---

## Done When

- [ ] `POST /index` with a real folder path streams back progress lines and completes without error
- [ ] A ChromaDB collection exists on disk after indexing (check the persist_dir)
- [ ] Running `POST /index` a second time on the same folder does not crash (idempotent)
- [ ] Indexing `dev-docs/` successfully indexes all markdown files
- [ ] Changelog updated
