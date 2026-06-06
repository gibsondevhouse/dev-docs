# Plan 002 — Context Briefing

> **For the agent:** Read this file before executing any work in this plan. It describes the exact current state of the codebase and all architectural decisions that differ from d-001.

---

## Current Codebase State

The app is a Tauri v2 desktop app running at `http://localhost:1420` in dev mode. The Python FastAPI sidecar runs on `http://127.0.0.1:37421`.

### What is done

- **Tauri project** scaffolded with Vite + React 18 + TypeScript + Tailwind + shadcn/ui
- **AppShell + Sidebar** with routing to Chat (`/chat`), Repos (`/repos`), Settings (`/settings`)
- **Settings screen** — masked API key input, six-model dropdown, Save button with 2-second confirmation
- **Python sidecar** — FastAPI on port 37421, `/health` endpoint, `/chat` SSE streaming proxy
- **`src/lib/settings.ts`** — `loadSettings()` and `saveSettings()` using macOS Keychain + plugin-store
- **`src/lib/sidecar.ts`** — `checkSidecarHealth()` and `SIDECAR_URL` export

### What is NOT done (this plan's scope)

- No `src/lib/api.ts` — no typed HTTP client for the sidecar
- No connection-test button in SettingsScreen
- `ChatScreen` is a placeholder: `<div className="p-6 text-2xl font-semibold">Chat</div>`
- `ReposScreen` is a placeholder: `<div className="p-6 text-2xl font-semibold">Repos</div>`
- No `src/types/` directory
- No Zustand stores
- Python sidecar has no `/index` or `/search` endpoints

---

## Relevant Files

| File | Role |
|------|------|
| `src/lib/settings.ts` | `loadSettings()` returns `{ openrouterApiKey, selectedModel }` — use this to get the key |
| `src/lib/sidecar.ts` | Exports `SIDECAR_URL = "http://127.0.0.1:37421"` |
| `src/screens/ChatScreen.tsx` | Placeholder — replaced in ST2 |
| `src/screens/ReposScreen.tsx` | Placeholder — replaced in ST3 |
| `src/screens/SettingsScreen.tsx` | Full settings form — extended in ST1 |
| `src-python/main.py` | FastAPI app — routers are registered here |
| `src-python/routers/chat.py` | `POST /chat` SSE proxy — extended in ST3 |
| `src-python/services/openrouter.py` | `stream_chat()` async generator |

---

## Critical Architectural Deviations from d-001

### 1. API key is in macOS Keychain, NOT plugin-store

d-001 assumed `@tauri-apps/plugin-store` would hold the API key. The actual implementation stores it in macOS Keychain via two Tauri commands:

```typescript
// Read the key (already done inside loadSettings):
const key = await invoke<string>("load_openrouter_api_key");

// Save the key (already done inside saveSettings):
await invoke("save_openrouter_api_key", { apiKey: key });
```

**Always use `loadSettings()` to get the API key. Never read it from the store directly.**

### 2. `settings.ts` uses `invoke`, not just `Store`

`loadSettings()` calls `invoke("load_openrouter_api_key")` which is a Tauri command backed by Rust/Keychain. This only works inside the Tauri runtime, not in plain browser. In dev mode (`npm run dev` without Tauri), `loadSettings()` will throw — this is expected and handled with try/catch in SettingsScreen.

### 3. Tauri plugin-store `Store.load()` not `new Store()`

The current `@tauri-apps/plugin-store` v2 API uses `Store.load(filename, { defaults })` to get a store instance. `new Store(filename)` is not available.

### 4. `AppShell` does not use React Router's `activeItem` prop

The `Sidebar` component ignores the `activeItem` prop passed from `AppShell` (it uses `useLocation()` directly). `AppShell` currently passes `activeItem="chat"` which is unused — do not change this.

---

## Approved New Dependencies for This Plan

**npm (install only when the specific part says so):**
- `zustand` — install in ST2 PH3
- `react-markdown` — install in ST2 PH1
- `rehype-highlight` — install in ST2 PH1
- `highlight.js` — install in ST2 PH1
- `@tailwindcss/typography` — install in ST2 PH1
- `@tauri-apps/plugin-dialog` — install in ST3 PH1 PT1
- `@tauri-apps/api` (path utils) — already installed, no action needed

**Python (add to `pyproject.toml` and run `uv sync`):**
- `llama-index>=0.10.0` — already in pyproject.toml
- `llama-index-vector-stores-chroma>=0.1.0` — already in pyproject.toml
- `chromadb>=0.5.0` — already in pyproject.toml

---

## Constraints

- Do not change `AppShell`, `Sidebar`, or the routing configuration
- Do not change `settings.ts` or `sidecar.ts`
- Do not log the API key anywhere (not in Python sidecar logs, not in browser console)
- Do not use `any` TypeScript types without a `// eslint-disable` comment + justification
- The Python sidecar runs in `src-python/` and is started with `uv run uvicorn main:app --host 127.0.0.1 --port 37421`
- Do not add the `persist_dir` parameter to `/chat` until ST3 PH2 PT2 — keep it clean until then
