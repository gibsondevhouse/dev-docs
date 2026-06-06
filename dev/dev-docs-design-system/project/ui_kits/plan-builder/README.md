# Plan Builder — UI kit

A high-fidelity, interactive recreation of the **dev-docs** desktop app (Tauri). It composes the design system's tokens and primitive styles into the product's three real screens.

## Run it
Open `index.html`. It loads `../../styles.css` (tokens) + `kit.css` (component + layout styles), then React/Babel and the kit JSX.

## Screens (all interactive)
- **Chat** — `screens.jsx → ChatScreen`. Type a plain-English request and Send. The assistant streams a markdown reply, and the right **Preview** pane fills with the generated plan: a `d-NNN` type tag, status badge, a live file tree (folders + `.md` files), a rendered file viewer (click any file), and an **Export plan to disk** action. Mirrors the app's `ChatView` + `MessageList` + `InputBar` and the d-003 "Vibe Planner" preview concept.
- **Repos** — `ReposScreen`. Pick a folder, **Index Folder**, and watch the RAG index stream into a near-black terminal log (`✓ Done`). Mirrors `ReposScreen.tsx`.
- **Settings** — `SettingsScreen`. OpenRouter API key (mono, masked), model select, Save, and **Test Connection → Connected**. Mirrors `SettingsScreen.tsx`.

## Structure
| File | Role |
| --- | --- |
| `index.html` | Mounts the app; the `@dsCard` + `@startingPoint` frame. |
| `kit.css` | Component styles (buttons, fields, cards, badges, status) + app-shell layout. Token-driven. |
| `ui.jsx` | Primitives: `Icon` (inline Lucide), `Button`, `IconButton`, `Field/Input/Select/Textarea`, `Card`, `Badge`, `StatusBadge`, `PlanTypeTag`. |
| `screens.jsx` | `Rail`, `ChatScreen`, `ReposScreen`, `SettingsScreen`, `App`. |

## Fidelity notes
- The 56px dark **rail** (zinc-900), light content area, 1px borders (not shadows), `text-sm` body, and Lucide icons all match the real app.
- These primitives are token-faithful, self-contained copies of the design-system components (so the kit runs without the compiled bundle). In production, import the real components from the system bundle instead. The visual contract is identical.
- The assistant reply, plan tree, and index log are **canned** — this is a visual/interaction recreation, not the live RAG backend.
