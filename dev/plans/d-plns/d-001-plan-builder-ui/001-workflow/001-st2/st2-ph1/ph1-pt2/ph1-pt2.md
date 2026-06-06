# Stage 2 / Phase 1 / Part 2 — Persist Settings with Tauri Plugin-Store
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Verify that the Tauri plugin-store is correctly persisting settings across app restarts, and add the plugin registration to `src-tauri/Cargo.toml` and `main.rs` if it was not done in PT1.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-tauri/Cargo.toml` | Confirm `tauri-plugin-store = "2"` is present |
| `src-tauri/src/main.rs` | Confirm plugin is registered via `.plugin(tauri_plugin_store::Builder::default().build())` |
| `src/lib/settings.ts` | Confirm `store.save()` is called after writes |

---

## Exact Requirements

1. Confirm `src-tauri/Cargo.toml` contains:
   ```toml
   tauri-plugin-store = "2"
   ```
   If missing, add it under `[dependencies]`.

2. Confirm `src-tauri/src/main.rs` registers the plugin:
   ```rust
   tauri::Builder::default()
       .plugin(tauri_plugin_shell::init())
       .plugin(tauri_plugin_store::Builder::default().build())
       .setup(|app| { /* sidecar spawn */ Ok(()) })
       .run(tauri::generate_context!())
       .expect("error while running tauri application");
   ```

3. Confirm `src/lib/settings.ts` calls `await store.save()` after every `store.set()` call. If not, add it.

4. Manual verification steps:
   - Start the app, enter a test API key in Settings, click Save
   - Fully close and restart the app
   - Confirm the API key field is pre-filled with the saved value

---

## What Not to Change

- Do not change any UI — this is a verification + fixup task only

---

## Done When

- [ ] `tauri-plugin-store = "2"` is in `Cargo.toml`
- [ ] Plugin is registered in `main.rs`
- [ ] App compiles without errors after any changes
- [ ] Entering a value, saving, restarting, and checking confirms the value persists
- [ ] Changelog updated
