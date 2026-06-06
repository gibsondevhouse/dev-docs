# dev-docs

**dev-docs** (the in-app product is called **Plan Builder**) is a Tauri desktop app for *vibe-coders* — people who know what they want to build but struggle to articulate it technically. You have a plain-English conversation with an LLM; it reads your **actual codebase via RAG**; and it generates a structured, **agent-executable plan** in the dev-docs template format. The plan lands on disk ready for an AI coding agent to execute — no manual writing required.

**Three screens:** **Chat** (bui, ld a plan), **Repos** (index a local codebase), **Settings** (API key + model).

---

## What's in this repo

```text
dev-docs/           ← Tauri desktop app (source)
dev/
  plans/            ← Active and archived development plans
  roadmap/          ← Project-level direction and vision
  dev-docs-design-system/ ← Brand & UI design system (source of truth)
package.json        ← Root scripts (dev, build, sidecar)
```

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Desktop runtime | Tauri 2 (Rust) |
| Frontend | React 19 + TypeScript + Tailwind CSS + Vite + shadcn/ui |
| Icons | lucide-react |
| AI sidecar | FastAPI + Python 3.11+ |
| Vector store | ChromaDB via LlamaIndex |
| LLM provider | OpenRouter (DeepSeek-first) |
| Secrets | macOS Keychain via Tauri |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- [Rust](https://rustup.rs) (stable toolchain)
- [Python](https://python.org) 3.11+ with [uv](https://docs.astral.sh/uv/)
- An [OpenRouter](https://openrouter.ai) API key

### Setup

```bash
# Install frontend dependencies
npm install --prefix dev-docs

# Install Python sidecar dependencies
uv sync --project dev-docs/src-python
```

### Run in development

```bash
# Start everything (Tauri dev server + frontend HMR)
npm run dev

# Or start the Python sidecar separately (for backend-only work)
npm run sidecar
```

### Build

```bash
npm run build
```

---

## Contributing

This project uses a structured planning workflow. Before starting any work:

1. Check `dev/plans/active-plan.md` for what's currently in progress
2. Read `dev/roadmap/roadmap.md` for project direction and constraints
3. New features are planned in `dev/plans/d-plns/` before implementation begins

All plans follow the template in `dev/plans/TEMPLATE-x-nnn-plan_name.md/`.

---

## Roadmap

See [dev/roadmap/roadmap.md](dev/roadmap/roadmap.md) for the full feature map and vision.
