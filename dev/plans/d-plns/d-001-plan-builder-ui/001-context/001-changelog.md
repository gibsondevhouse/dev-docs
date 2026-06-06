# Plan 001 — Changelog

> **For the agent:** Before starting any work, read this file to understand what has already been completed in previous sessions. After completing your session's work, append a new entry at the top of the log below.

---

## How to Write a Log Entry

Copy this block and fill it in after each session:

```
### [YYYY-MM-DD] — [Stage / Phase / Part completed]
**Agent session:** [Brief description of what was asked of you]
**Completed:**
- [What was done — be specific about files changed and what changed]
**Current state:** [One sentence: where things stand now, what works, what's next]
**Blockers or notes:** [Anything the next agent should know. Write "None" if clean.]
```

---

## Log

### [2026-06-05] — Stage 2 / Phase 2 / Part 1 implemented; validation blocked
**Agent session:** Continued Plan 001 and implemented the FastAPI `/chat` OpenRouter streaming proxy.
**Completed:**
- Created `src-python/services/openrouter.py` with an `httpx` streaming OpenRouter client and sanitized HTTP error handling.
- Created `src-python/routers/chat.py` with `POST /chat`, SSE formatting, `[DONE]` final event handling, and preflight of the first stream chunk so OpenRouter 4xx errors return non-500 responses.
- Registered the chat router in `src-python/main.py`.
- Verified Python syntax/imports with `uv run python -m compileall main.py routers services`.
- Started uvicorn, verified `/health`, and confirmed an invalid OpenRouter key returns `401 Unauthorized` instead of a 500. Sidecar logs did not include the API key.
**Current state:** `/chat` implementation is in place, but Stage 2 / Phase 2 / Part 1 cannot be marked done until a real OpenRouter API key is available to verify valid streaming SSE chunks.
**Blockers or notes:** `OPENROUTER_API_KEY` is not present in the environment, and no user key is available. Do not proceed to the connection-test UI until valid streaming is verified.

### [2026-06-05] — Stage 2 / Phase 1 / Part 2 completed
**Agent session:** Continued Plan 001 and verified settings persistence, correcting API-key storage to avoid plaintext.
**Completed:**
- Confirmed `tauri-plugin-store = "2"` is present and the store plugin is registered in the existing Tauri builder.
- Confirmed `src/lib/settings.ts` saves after store writes.
- Built a debug macOS `.app` bundle and used Computer Use to enter a dummy API key, save it, close and reopen the app, and confirm the key field reloads prefilled and masked.
- Found that plugin-store writes plaintext JSON by default, so moved API-key storage to macOS Keychain via Tauri commands and left plugin-store responsible only for non-secret `selectedModel`.
- Added migration logic to remove any legacy plaintext `openrouterApiKey` from `settings.json`.
- Verified `settings.json` contains only `selectedModel`, verified the dummy key was removed from Keychain after cleanup, and reran `npm run tauri -- build --debug --bundles app`.
**Current state:** Stage 2 / Phase 1 is done; next pickup is Stage 2 / Phase 2 / Part 1, the FastAPI `/chat` OpenRouter streaming proxy.
**Blockers or notes:** The plan assumed plugin-store encryption, but the current Tauri plugin-store wrote plaintext. Keychain storage is used for the API key to satisfy the no-plaintext-secret rule.

### [2026-06-05] — Stage 2 / Phase 1 / Part 1 completed
**Agent session:** Continued Plan 001 and replaced the Settings placeholder with the settings form UI and store wrapper.
**Completed:**
- Installed `@tauri-apps/plugin-store`.
- Created `src/lib/settings.ts` with typed `AppSettings`, `loadSettings`, and `saveSettings` functions using the current Tauri v2 `Store.load(...)` API.
- Replaced `SettingsScreen` with a form containing a masked OpenRouter API key input, six-model dropdown, Save button, 2-second Saved confirmation, and empty status area.
- Added `tauri-plugin-store = "2"` to `src-tauri/Cargo.toml`, registered the store plugin in the existing Tauri builder, and added `store:default` to the default capability.
- Verified `npm run build`, `cargo check`, Settings form render, password input type, six dropdown options, no browser console errors, and a native `npm run tauri dev` launch with sidecar health.
**Current state:** Stage 2 / Phase 1 / Part 1 is done; next pickup is Stage 2 / Phase 1 / Part 2, explicit store persistence verification across restart.
**Blockers or notes:** The installed Tauri store package uses `Store.load(...)`; the prompt's `new Store(...)` constructor is private in the current package. Native UI automation could not attach to the raw Tauri dev binary, so save/restart verification is left to the dedicated PT2 prompt.

### [2026-06-05] — Stage 1 / Phase 2 / Part 2 completed
**Agent session:** Continued Plan 001 and added React Router routes with placeholder screens.
**Completed:**
- Installed `react-router-dom` and wrapped the app in `BrowserRouter`.
- Added placeholder `ChatScreen`, `ReposScreen`, and `SettingsScreen` components.
- Replaced the placeholder content inside `AppShell` with `Routes`, including `/` redirecting to `/chat`.
- Wired the sidebar to `useNavigate` and `useLocation` for route navigation and active icon state.
- Verified `npm run build`, default redirect, Chat/Repos/Settings sidebar navigation, active state, no browser console errors, and a full Stage 1 `npm run tauri dev` pass with sidecar health and no orphaned sidecar after shutdown.
**Current state:** Stage 1 is complete; next pickup is Stage 2 / Phase 1 / Part 1, the Settings screen UI component.
**Blockers or notes:** None.

### [2026-06-05] — Stage 1 / Phase 2 / Part 1 completed
**Agent session:** Continued Plan 001 and built the base AppShell and Sidebar layout.
**Completed:**
- Created `src/components/layout/AppShell.tsx` with a full-height two-column layout.
- Created `src/components/layout/Sidebar.tsx` with Chat, Repos, and bottom-pinned Settings icon buttons using lucide-react.
- Replaced the generated demo UI in `src/App.tsx` with `<AppShell><div>Content here</div></AppShell>`.
- Added full-height `html`, `body`, and `#root` CSS in `src/index.css`.
- Verified `npm run build`, browser render, icon clicks with no console errors, Settings pinned to the bottom, and viewport-matching layout dimensions with no scrollbar.
**Current state:** Stage 1 / Phase 2 / Part 1 is done; next pickup is Stage 1 / Phase 2 / Part 2, React Router placeholder screens.
**Blockers or notes:** `lucide-react` was already present from shadcn initialization; `npm install lucide-react` reported it was up to date.

### [2026-06-05] — Stage 1 / Phase 1 / Part 3 completed
**Agent session:** Continued Plan 001 and wired the Python sidecar to Tauri startup and shutdown.
**Completed:**
- Added `tauri-plugin-shell` to `src-tauri/Cargo.toml` and registered it in the existing Tauri builder.
- Added `src-python/start-sidecar` plus the required `start-sidecar-aarch64-apple-darwin` external-bin wrapper for Tauri's macOS arm64 sidecar resolution.
- Added sidecar startup in the Tauri setup hook and shutdown cleanup in the window destroyed handler while preserving the generated opener plugin and `greet` command.
- Added `src/lib/sidecar.ts` with `SIDECAR_URL` and `checkSidecarHealth`.
- Verified `cargo check`, `npm run build`, `npm run tauri dev`, automatic `/health` availability while Tauri is running, and no orphaned uvicorn process after Tauri stops.
**Current state:** Stage 1 / Phase 1 is done; next pickup is Stage 1 / Phase 2 / Part 1, the AppShell and Sidebar layout.
**Blockers or notes:** The generated Tauri scaffold keeps the builder in `src-tauri/src/lib.rs`, so the shell plugin was registered there instead of replacing `main.rs`. The current shell plugin rejects the plan's `plugins.shell.sidecar` field, so only the valid `plugins.shell.open` config remains; sidecar execution is enabled by `bundle.externalBin` plus Rust startup code.

### [2026-06-05] — Stage 1 / Phase 1 / Part 2 completed
**Agent session:** Continued Plan 001 and completed the Python FastAPI sidecar skeleton.
**Completed:**
- Created `plan-builder/src-python/` with `main.py`, `pyproject.toml`, `.env.example`, and empty `routers/` and `services/` packages.
- Installed `uv` from the plan-specified installer because it was not present on PATH.
- Ran `uv sync`; it created the sidecar virtualenv with CPython 3.12 and installed the approved dependency set.
- Verified `uv run uvicorn main:app --host 127.0.0.1 --port 37421` starts and `curl http://127.0.0.1:37421/health` returns `{"status":"ok"}`.
**Current state:** Stage 1 / Phase 1 / Part 2 is done; next pickup is Stage 1 / Phase 1 / Part 3, wiring the sidecar to Tauri startup and shutdown.
**Blockers or notes:** None.

### [2026-06-05] — Stage 1 / Phase 1 / Part 1 completed
**Agent session:** Executed Plan 001 from the active tracker and completed the initial Tauri + Vite + React scaffold.
**Completed:**
- Created `plan-builder/` as the Tauri v2 + Vite + React + TypeScript project root.
- Installed project dependencies, Tailwind CSS with `tailwind.config.js`, shadcn/ui, and the shadcn utility file at `src/lib/utils.ts`.
- Configured `src/index.css`, `tailwind.config.js`, TypeScript/Vite import aliases, and `src-tauri/tauri.conf.json` for the Plan Builder app name, identifier, and 1280x800 window.
- Verified Tailwind with a temporary `text-blue-500` class, then removed it; `npm run build` passed in the final state.
- Verified `npm run tauri dev` compiled and launched `target/debug/plan-builder`; the local Vite page rendered with only React's devtools info message in the browser console.
**Current state:** Stage 1 / Phase 1 / Part 1 is done; next pickup is Stage 1 / Phase 1 / Part 2, the Python FastAPI sidecar skeleton.
**Blockers or notes:** `tailwindcss@latest` installed v4.3.0, whose package did not expose the legacy init executable, so Tailwind was pinned to `3.4.17` to satisfy the plan's `npx tailwindcss init -p` workflow. `shadcn@latest` exposed a newer preset flow, so `shadcn@2.10.0` was used to select the requested Default style and Slate base color. `python3` is 3.9.6, but `python3.12` is available.
