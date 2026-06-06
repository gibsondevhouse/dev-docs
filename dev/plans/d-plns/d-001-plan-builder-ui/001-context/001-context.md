# Plan 001 — Context Briefing

> **For the agent:** Read this file before executing any work in this plan. It gives you the current state of the codebase, the files you'll be working with, and decisions that have already been made. Do not assume anything beyond what is written here.

---

## Project Structure (target — to be built)

```
plan-builder/                     ← project root
├── src/                          ← React frontend (Vite + TypeScript)
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx      ← top-level shell: sidebar + content area
│   │   │   └── Sidebar.tsx       ← nav links (Chat, Settings, Repos)
│   │   ├── chat/
│   │   │   ├── ChatView.tsx      ← main chat screen (chat pane + preview pane)
│   │   │   ├── MessageList.tsx   ← scrollable list of chat messages
│   │   │   └── InputBar.tsx      ← textarea + send button
│   │   ├── preview/
│   │   │   ├── PreviewPanel.tsx  ← right panel wrapper
│   │   │   ├── FileTree.tsx      ← folder/file tree of the built plan
│   │   │   └── FileViewer.tsx    ← rendered markdown of a selected file
│   │   ├── settings/
│   │   │   └── SettingsView.tsx  ← API key, model picker, connection test
│   │   └── export/
│   │       └── ExportModal.tsx   ← confirm dialog before writing to disk
│   ├── store/
│   │   ├── chatStore.ts          ← Zustand: session chat history
│   │   └── planStore.ts          ← Zustand: current in-progress plan state
│   └── lib/
│       ├── api.ts                ← HTTP/WS client pointing to Python sidecar
│       └── settings.ts           ← wrapper around @tauri-apps/plugin-store
├── src-tauri/                    ← Tauri v2 (Rust)
│   ├── src/
│   │   └── main.rs               ← Tauri setup, sidecar spawn command
│   ├── Cargo.toml
│   └── tauri.conf.json
└── src-python/                   ← Python FastAPI sidecar
    ├── main.py                   ← FastAPI app, startup/shutdown
    ├── routers/
    │   ├── chat.py               ← POST /chat (OpenRouter proxy, streaming)
    │   ├── index_repo.py         ← POST /index (LlamaIndex + ChromaDB)
    │   ├── search.py             ← POST /search (RAG query)
    │   └── export_plan.py        ← POST /export (write files to disk)
    ├── services/
    │   ├── rag.py                ← LlamaIndex service (index + query)
    │   ├── openrouter.py         ← OpenRouter API client (httpx, streaming)
    │   └── plan_builder.py       ← Plan JSON schema + file tree generator
    └── pyproject.toml            ← uv-managed dependencies
```

---

## Current State

This is a greenfield project. No code exists yet. The plan-builder app will be created from scratch starting in ST1.

---

## Key Decisions Already Made

- **Desktop app:** Tauri v2 (macOS-first; cross-platform can come later)
- **Frontend:** Vite + React 18 + TypeScript + Tailwind CSS
- **UI components:** shadcn/ui (installed on top of Tailwind)
- **State management:** Zustand (no Redux, no Context API for shared state)
- **Routing:** React Router v6
- **Backend sidecar:** Python 3.11+ with FastAPI + uvicorn
- **RAG framework:** LlamaIndex (not LangChain)
- **Vector store:** ChromaDB (local, file-based, stored in Tauri app data dir)
- **LLM provider:** OpenRouter (user-provided API key, any model the user selects)
- **Sidecar communication:** REST over HTTP for most calls; WebSocket for streaming chat responses and indexing progress
- **Sidecar port:** `37421` (hardcoded for development; can be made dynamic later)
- **Settings storage:** `@tauri-apps/plugin-store` — encrypted JSON in Tauri app data dir
- **API key security:** Stored via Tauri plugin-store (AES-256 encrypted at rest), never written to disk in plaintext, never logged
- **Plan export target:** User selects output directory via Tauri file dialog; plan is written as `{type}-{nnn}-{name}.md/` folder structure matching the template exactly
- **Export flow:** Preview first (file tree with rendered content), then user clicks "Export" to confirm write
- **Markdown rendering:** `react-markdown` + `rehype-highlight` for syntax highlighting
- **Streaming:** OpenAI-compatible SSE from OpenRouter, parsed in Python, forwarded to frontend via WebSocket
- **App identifier:** `com.planbuilder.app`
- **App name:** `Plan Builder`

---

## Constraints & Rules

- Do not use LangChain — use LlamaIndex only
- Do not use Redux or Context API for global state — use Zustand only
- Do not expose the Python sidecar on any interface other than `127.0.0.1` (localhost only)
- Do not log the OpenRouter API key anywhere (not in console, not in files)
- Do not use `any` TypeScript types unless absolutely unavoidable; add a `// eslint-disable` comment with justification if used
- Keep the Python sidecar and React frontend fully decoupled: no shared modules or imports
- macOS is the target platform; do not add Windows-specific code in this plan
- Do not install packages that are not listed in each part's task — stick to the approved dependency list

---

## Approved Python Dependencies (src-python/pyproject.toml)

```
fastapi>=0.111.0
uvicorn[standard]>=0.29.0
llama-index>=0.10.0
llama-index-vector-stores-chroma>=0.1.0
chromadb>=0.5.0
httpx>=0.27.0
python-dotenv>=1.0.0
websockets>=12.0
pydantic>=2.0.0
```

## Approved Node/Frontend Dependencies

```
react-router-dom
zustand
react-markdown
rehype-highlight
highlight.js
@tauri-apps/plugin-store
@tauri-apps/plugin-dialog
@tauri-apps/plugin-shell
tailwindcss
@tailwindcss/typography
shadcn/ui (cli install)
```

---

## Helpful Background

The plan template this app is designed to export follows the structure in:
`dev-docs/plans/_templates/`

The exported plan must replicate this exact folder/file structure with agent-generated content filled in. The template uses `nnn` as a placeholder for the plan number; the export process replaces all `nnn` references with the actual plan number.

The app is designed for personal use on macOS. It does not need authentication beyond the OpenRouter API key. There is no backend server other than the local Python sidecar.

The RAG index is per-session for the indexed repo path; ChromaDB persists to disk so re-indexing is only needed when the repo changes. The user can trigger a re-index from the UI.
