# Stage 1 / Phase 1 / Part 2 — Python FastAPI Sidecar Skeleton
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create the `src-python/` directory inside the project root with a minimal FastAPI app that has a health endpoint. Set up `uv` for dependency management.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/pyproject.toml` | Create with all approved dependencies |
| `src-python/main.py` | Create FastAPI app with `/health` endpoint |
| `src-python/routers/` | Create empty directory (add `__init__.py`) |
| `src-python/services/` | Create empty directory (add `__init__.py`) |
| `src-python/.env.example` | Create with `OPENROUTER_API_KEY=` placeholder |

---

## Exact Requirements

1. From the project root, create the Python directory structure:
   ```
   src-python/
   ├── main.py
   ├── pyproject.toml
   ├── .env.example
   ├── routers/
   │   └── __init__.py
   └── services/
       └── __init__.py
   ```

2. Create `src-python/pyproject.toml`:
   ```toml
   [project]
   name = "plan-builder-sidecar"
   version = "0.1.0"
   requires-python = ">=3.11"
   dependencies = [
     "fastapi>=0.111.0",
     "uvicorn[standard]>=0.29.0",
     "llama-index>=0.10.0",
     "llama-index-vector-stores-chroma>=0.1.0",
     "chromadb>=0.5.0",
     "httpx>=0.27.0",
     "python-dotenv>=1.0.0",
     "websockets>=12.0",
     "pydantic>=2.0.0",
   ]
   ```

3. Create `src-python/main.py`:
   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware

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
   ```
   Note: `1420` is Tauri's default dev server port. The `tauri://localhost` origin covers the production build.

4. Create `src-python/.env.example` with the single line: `OPENROUTER_API_KEY=`

5. From inside `src-python/`, install dependencies:
   ```bash
   cd src-python
   uv sync
   ```
   If `uv` is not installed: `curl -LsSf https://astral.sh/uv/install.sh | sh`

6. Start the server to verify:
   ```bash
   uv run uvicorn main:app --host 127.0.0.1 --port 37421
   ```
   Then in another terminal: `curl http://127.0.0.1:37421/health`
   Confirm response is `{"status":"ok"}`.

---

## What Not to Change

- Do not add any route logic yet — only the `/health` endpoint in this part
- Do not create a `.env` file with a real API key — only the example file

---

## Done When

- [ ] `src-python/` directory exists with the described structure
- [ ] `uv run uvicorn main:app --host 127.0.0.1 --port 37421` starts without errors
- [ ] `curl http://127.0.0.1:37421/health` returns `{"status":"ok"}`
- [ ] `src-python/pyproject.toml` lists all approved dependencies
- [ ] Changelog updated
