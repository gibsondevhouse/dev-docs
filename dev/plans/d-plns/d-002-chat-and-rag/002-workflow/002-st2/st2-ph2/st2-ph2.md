# Stage 2 / Phase 2 — Input Bar + Streaming
**Plan:** 002 — Chat and RAG

> **For the agent:** This phase adds the input bar and wires real streaming from POST /chat. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The user can type a message, press Enter, and see the assistant response stream token-by-token into the latest assistant bubble. The input is disabled while streaming.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph2-pt1/` | InputBar component | Not started |
| PT2 | `ph2-pt2/` | streamChat in api.ts + wire to ChatView | Not started |

---

## Context for This Phase

PH1 must be complete. `ChatView` manages local state for messages and streaming for now (Zustand migration is PH3). `loadSettings()` from `src/lib/settings.ts` provides the API key and model. The sidecar's `/chat` endpoint is already live.

---

## Acceptance Criteria

- [ ] Both parts done
- [ ] Pressing Enter sends the message; Shift+Enter inserts a newline
- [ ] Assistant response streams in real time (tokens appear progressively)
- [ ] Message list auto-scrolls to the latest message during streaming
- [ ] Input and Send button are disabled while streaming; re-enabled on completion
- [ ] Errors from the API show as a red assistant message (not a JS exception)
- [ ] No API key in the browser console
