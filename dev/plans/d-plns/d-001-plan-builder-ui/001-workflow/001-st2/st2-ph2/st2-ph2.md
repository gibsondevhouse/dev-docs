# Stage 2 / Phase 2 — OpenRouter Connectivity
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase adds the FastAPI `/chat` endpoint that proxies requests to OpenRouter, and a connection test button in the Settings screen. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The Python sidecar exposes a `POST /chat` endpoint that accepts messages and an API key, forwards them to OpenRouter, and streams back the response. The Settings screen has a "Test Connection" button that calls this endpoint with a minimal prompt and displays success or failure.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph2-pt1/` | FastAPI /chat endpoint (OpenRouter streaming proxy) | Blocked |
| PT2 | `ph2-pt2/` | Connection test button + status indicator in Settings | Not started |

---

## Context for This Phase

The `/chat` endpoint is the core of the app. It receives messages from the frontend, appends the system prompt, calls OpenRouter's chat completions API (OpenAI-compatible), and streams the response via Server-Sent Events (SSE). The frontend will use this endpoint both for connection testing (PT2) and for the full chat UI (ST4).

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] `POST /chat` with a valid API key and messages returns a streaming SSE response
- [x] `POST /chat` with an invalid API key returns a clear error (not a 500 crash)
- [ ] Settings screen shows "Testing..." while the request is in flight
- [ ] Settings screen shows "Connected — [model name]" on success
- [ ] Settings screen shows a red error message on failure
- [ ] No API key logged in Python sidecar logs
