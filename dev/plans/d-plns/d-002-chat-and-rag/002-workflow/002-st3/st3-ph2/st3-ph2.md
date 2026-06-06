# Stage 3 / Phase 2 — RAG Retrieval + Context Injection
**Plan:** 002 — Chat and RAG

> **For the agent:** This phase adds the /search endpoint and wires retrieved context into the /chat system prompt. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

`POST /search` queries the ChromaDB index. `POST /chat` automatically searches the index for the user's latest message and prepends the results as a system prompt context block before forwarding to OpenRouter.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph2-pt1/` | Python /search endpoint | Not started |
| PT2 | `ph2-pt2/` | Inject context into /chat + update ChatView to send persist_dir | Not started |

---

## Context for This Phase

PH1 must be complete (`/index` works, ChromaDB collection exists). The `/search` endpoint reuses `query_index()` from `services/rag.py`. `ChatView` needs to pass `persistDir` (from `loadSettings().repoPath`) to `streamChat`. The `StreamChatRequest` type in `api.ts` already has `persistDir?: string`.

---

## Acceptance Criteria

- [ ] Both parts done
- [ ] `POST /search` returns relevant snippets for a query
- [ ] `/chat` with a `persist_dir` prepends a system message with retrieved context
- [ ] `/chat` without a `persist_dir` works as before (no regression)
- [ ] Chat responses noticeably reference indexed content when relevant
- [ ] No crash if `persist_dir` exists but collection is empty
