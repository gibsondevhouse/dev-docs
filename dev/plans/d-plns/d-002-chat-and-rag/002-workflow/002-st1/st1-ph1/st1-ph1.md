# Stage 1 / Phase 1 — api.ts Client + Connection Test Button
**Plan:** 002 — Chat and RAG

> **For the agent:** This phase creates the HTTP client utility and adds the test button to Settings. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

`src/lib/api.ts` exists with a `testConnection` function. The Settings screen has a "Test Connection" button wired to it, with a status badge showing success or failure.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | Create src/lib/api.ts | Not started |
| PT2 | `ph1-pt2/` | Add test button to SettingsScreen | Not started |

---

## Context for This Phase

`src/lib/sidecar.ts` exports `SIDECAR_URL = "http://127.0.0.1:37421"`. Import from there. `loadSettings()` in `src/lib/settings.ts` returns `{ openrouterApiKey, selectedModel }` — the API key is retrieved from macOS Keychain via `invoke`. The `/chat` endpoint is already implemented and accepts `{ api_key, model, messages }`.

---

## Acceptance Criteria

- [ ] Both parts done
- [ ] `testConnection` reads the current form values, not the saved ones
- [ ] Success shows green badge with "Connected"
- [ ] Failure (bad key, network error) shows red badge with a short error message
- [ ] No API key in console or network logs
