# Project Roadmap — Full Vision

> **For the agent:** This document describes what this project is and what it is meant to become. Read it to understand the direction of the project before making decisions. Do not use it to determine what to work on next — use `active-plan.md` for that. Use this to avoid building things that contradict the vision.

---

## What This Project Is

**dev-docs** (the in-app product is called **Plan Builder**) is a Tauri desktop app for *vibe-coders* — people who know what they want to build but struggle to articulate it technically. You have a plain-English conversation with an LLM; it reads your **actual codebase via RAG**; and it generates a structured, **agent-executable plan** in the dev-docs template format. The plan lands on disk ready for an AI coding agent to execute — no manual writing required.

The product is one solo developer's planning methodology, expanded into an app. Work is organized as **Plans**, broken down **Stages → Phases → Parts**, with three plan types (`d` development · `p` polishing · `r` refactoring) and clear lifecycle statuses (Queued → Active → Complete → Archived · or Deferred).

**One product, three screens:** **Chat** (have a conversation to build a plan), **Repos** (index a local codebase for RAG), **Settings** (API key + model). A 56px dark icon rail switches between them; the content area is light.

---

## Core Principles

_The values or constraints that should guide every decision made in this project._

- **Plain English in, structured plans out.** The user never writes plan files manually. The app does it.
- **Grounded in real code.** Plans are generated from what actually exists on disk, not from memory or assumption.
- **Agent-ready output.** Every exported plan must be immediately executable by a coding agent without further editing.
- **One screen at a time.** The UI stays minimal. No feature gets added unless it directly serves the planning loop.
- **DeepSeek-first.** The app is optimized for DeepSeek's large context window. Other models are secondary.

---

## Feature Map

_Every feature or capability this project has or is intended to have, organized by status._

### Built — Fully implemented and working

- **Desktop shell (d-001):** Tauri 2 app with three-screen layout, 56px dark icon rail, screen routing — fully functional.
- **Settings screen:** OpenRouter API key entry, macOS Keychain storage via Tauri, connection test button, model selector — fully functional.

### Scaffolded — Exists in the code but incomplete or not functional

- **Chat screen:** UI shell (`ChatView`, `MessageList`, `InputBar`, preview pane) exists; LLM streaming and plan-preview rendering not yet wired to the backend.
- **Repos screen:** UI shell exists; folder picker and indexing log UI present; RAG indexing not yet connected to the Python sidecar.
- **Python sidecar:** FastAPI app with `routers/chat.py`, `routers/index_repo.py`, `routers/search.py` stubbed out; OpenRouter streaming and ChromaDB indexing not yet wired to the frontend.

### Active — Being built now

- **Chat and RAG (d-002):** OpenRouter streaming chat, full RAG pipeline over local repo via ChromaDB + LlamaIndex, plan preview generation. See `active-plan.md`.

### Planned — Decided, not yet started

- **Vibe Planner (d-003):** Higher-level conversational planning flow — describe what you want in plain English, get a fully structured plan file generated in the dev-docs template format.

### Out of scope — Explicitly decided NOT to build

- **Web / cloud version:** This is a local desktop tool. No server-side user data, no SaaS.
- **Multi-user / team features:** Designed for a single developer's workflow.
- **Non-local repos:** RAG indexes codebases on disk only — no remote Git cloning at index time.
- **Built-in plan editor:** Plans are plain Markdown on disk; the user edits them in their own editor.

---

## Open Questions

_Unresolved decisions that will affect what gets built. These should be answered before related plans are started._

- **Plan export format:** Should the generated plan be written directly to `dev/plans/d-plns/` in the user's indexed repo, or saved to a user-configured output path?
- **Model flexibility:** DeepSeek is primary, but should the UI expose a free-form model ID field (for any OpenRouter model) or a curated dropdown?
- **d-003 scope:** Does Vibe Planner replace the Chat screen, extend it, or become a separate screen?
