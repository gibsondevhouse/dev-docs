# Stage 2 / Phase 1 / Part 1 — Settings Screen UI Component
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Replace the `SettingsScreen` placeholder with a real form: a masked API key input, a model picker dropdown, and a Save button. Load saved values from `src/lib/settings.ts` on mount.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/screens/SettingsScreen.tsx` | Replace placeholder with settings form |
| `src/lib/settings.ts` | Create: typed wrapper for reading/writing settings |

---

## Exact Requirements

1. Create `src/lib/settings.ts` with typed read/write functions. Use `@tauri-apps/plugin-store` (install if needed: `npm install @tauri-apps/plugin-store`):

   ```typescript
   import { Store } from "@tauri-apps/plugin-store";

   const store = new Store("settings.json");

   export interface AppSettings {
     openrouterApiKey: string;
     selectedModel: string;
   }

   export async function loadSettings(): Promise<AppSettings> {
     const key = (await store.get<string>("openrouterApiKey")) ?? "";
     const model = (await store.get<string>("selectedModel")) ?? "anthropic/claude-3.5-sonnet";
     return { openrouterApiKey: key, selectedModel: model };
   }

   export async function saveSettings(settings: AppSettings): Promise<void> {
     await store.set("openrouterApiKey", settings.openrouterApiKey);
     await store.set("selectedModel", settings.selectedModel);
     await store.save();
   }
   ```

2. Build `src/screens/SettingsScreen.tsx` with:
   - A `<form>` that loads settings on mount via `useEffect`
   - API key field: `<input type="password">` with label "OpenRouter API Key", placeholder "sk-or-..."
   - Model picker: `<select>` or shadcn `<Select>` with these options:
     - `anthropic/claude-3.5-sonnet` (default)
     - `anthropic/claude-3-haiku`
     - `openai/gpt-4o`
     - `openai/gpt-4o-mini`
     - `google/gemini-pro-1.5`
     - `meta-llama/llama-3.1-70b-instruct`
   - Save button: calls `saveSettings()`, shows brief "Saved" confirmation text for 2 seconds
   - A status area below the save button (empty for now — populated in PH2 PT2)

3. Add `@tauri-apps/plugin-store` to `src-tauri/Cargo.toml`:
   ```toml
   tauri-plugin-store = "2"
   ```
   And register it in `src-tauri/src/main.rs`:
   ```rust
   .plugin(tauri_plugin_store::Builder::default().build())
   ```

---

## What Not to Change

- Do not add the "Test Connection" button yet — that is PH2 PT2
- Do not change any other screen component

---

## Done When

- [ ] Settings screen renders the API key input, model picker, and Save button
- [ ] API key field is masked with asterisks
- [ ] All six model options appear in the dropdown
- [ ] Clicking Save shows "Saved" confirmation for ~2 seconds
- [ ] Values load from settings on component mount (form is pre-filled after saving and reloading)
- [ ] No console errors
- [ ] Changelog updated
