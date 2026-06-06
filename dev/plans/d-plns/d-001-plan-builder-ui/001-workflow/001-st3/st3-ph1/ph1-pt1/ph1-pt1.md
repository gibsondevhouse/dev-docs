# Stage 3 / Phase 1 / Part 1 — Folder Picker UI
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Replace the `ReposScreen` placeholder with a UI that lets the user browse for a local folder and trigger indexing. Display the selected folder path and an Index button.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/screens/ReposScreen.tsx` | Replace placeholder with repo picker UI |

---

## Exact Requirements

1. Install Tauri dialog plugin:
   ```bash
   npm install @tauri-apps/plugin-dialog
   ```
   Add to `src-tauri/Cargo.toml`: `tauri-plugin-dialog = "2"`
   Register in `src-tauri/src/main.rs`: `.plugin(tauri_plugin_dialog::init())`

2. Build `src/screens/ReposScreen.tsx`:
   - Local state: `selectedPath: string | null`, `isIndexing: boolean`, `indexProgress: string[]`
   - "Browse Folder" button: calls `open({ directory: true })` from `@tauri-apps/plugin-dialog` and sets `selectedPath`
   - Display selected path below the button (or "No folder selected" if null)
   - "Index Folder" button: disabled when `selectedPath` is null or `isIndexing` is true
   - A progress log area below the button: scrollable `<div>` showing each `indexProgress` entry as a line (populated in PT3)
   - For now, clicking "Index Folder" just sets `isIndexing = true` and logs "Indexing starting..." — the actual API call is added in PT2 and PT3

3. Style the layout with Tailwind: vertical stack, comfortable padding, muted background for the progress log.

---

## What Not to Change

- Do not add the actual API call yet — that is PT2
- Do not add WebSocket handling yet — that is PT3

---

## Done When

- [ ] Repos screen renders with Browse and Index buttons
- [ ] Clicking Browse opens a native macOS folder picker dialog
- [ ] Selected path displays below the Browse button after picking
- [ ] Index button is disabled when no path is selected
- [ ] A scrollable progress log area is visible below the Index button
- [ ] No console errors
- [ ] Changelog updated
