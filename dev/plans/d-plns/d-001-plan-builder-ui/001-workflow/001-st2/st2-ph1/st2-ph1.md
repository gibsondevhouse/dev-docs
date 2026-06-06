# Stage 2 / Phase 1 — Settings Screen
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase builds the Settings screen UI and persists settings to the Tauri encrypted store. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The Settings screen has a form with an API key input field (password-masked), a model picker dropdown populated with common OpenRouter models, and a Save button. Submitted values are stored via `@tauri-apps/plugin-store`.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | Settings screen UI component | Done |
| PT2 | `ph1-pt2/` | Persist settings with Tauri plugin-store | Done |

---

## Context for This Phase

`src/screens/SettingsScreen.tsx` is currently a placeholder. This phase replaces it with a real form. Settings that must be stored: `openrouterApiKey` (string), `selectedModel` (string). A `src/lib/settings.ts` wrapper will handle reads/writes to the Tauri store.

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] API key field is masked (`type="password"`)
- [ ] Model picker lists at least 5 OpenRouter model options
- [ ] Saving stores values; reloading the app restores them in the form
- [ ] No API key visible in browser DevTools console or Network tab
- [ ] No console errors
