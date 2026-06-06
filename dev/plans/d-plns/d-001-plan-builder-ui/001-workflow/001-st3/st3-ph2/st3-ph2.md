# Stage 3 / Phase 2 — RAG Retrieval + Context Injection
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase adds the search endpoint and wires retrieved context into the chat system prompt. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The sidecar exposes a `POST /search` endpoint that queries the ChromaDB index and returns relevant text snippets. The `/chat` endpoint is updated to automatically call `/search` and prepend the results to the system prompt before forwarding to OpenRouter.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph2-pt1/` | FastAPI /search endpoint (RAG query) | Not started |
| PT2 | `ph2-pt2/` | Inject retrieved context into /chat system prompt | Not started |

---

## Context for This Phase

The ChromaDB collection created in PH1 is referenced by name. The `/search` endpoint queries it with the user's message text and returns the top-N matching chunks. The `/chat` endpoint is modified so that if a collection exists, it runs a search before building the messages array.

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] `POST /search` returns an array of matching text snippets for a query
- [ ] The `/chat` endpoint prepends a system message with retrieved context when a collection exists
- [ ] Chat responses are visibly more relevant to the indexed repo content
- [ ] Searching on an empty/missing collection returns an empty array gracefully (no crash)
