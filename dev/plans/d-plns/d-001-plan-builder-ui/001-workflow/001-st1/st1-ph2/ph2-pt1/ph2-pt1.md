# Stage 1 / Phase 2 / Part 1 — App Shell (AppShell + Sidebar)
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create the `AppShell` and `Sidebar` components that form the persistent two-column layout of the app: a narrow fixed sidebar on the left and a main content area on the right.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/components/layout/AppShell.tsx` | Create: outer layout wrapper |
| `src/components/layout/Sidebar.tsx` | Create: sidebar with nav items |
| `src/App.tsx` | Replace default content with `<AppShell>` |
| `src/index.css` | Ensure `html, body, #root` fill the full viewport height |

---

## Exact Requirements

1. Create `src/components/layout/AppShell.tsx`:
   - Full-height flex row: sidebar on left, `<main>` content area on right filling remaining width
   - Sidebar is 56px wide (icon-only) — no labels needed yet
   - `<main>` receives `children` and renders them

2. Create `src/components/layout/Sidebar.tsx`:
   - Three nav icon buttons stacked vertically: Chat (top), Repos (middle), Settings (bottom-pinned)
   - Use lucide-react icons: `MessageSquare` for Chat, `FolderOpen` for Repos, `Settings` for Settings
   - Install lucide-react: `npm install lucide-react`
   - Each button accepts an `onClick` prop (routing will be wired in PT2)
   - Active state: pass `isActive` boolean prop; active button has a highlighted background (use Tailwind `bg-accent`)
   - Sidebar background: `bg-sidebar` or `bg-zinc-900`; icon color: `text-zinc-400`, active: `text-white`

3. Update `src/App.tsx` to render `<AppShell><div>Content here</div></AppShell>`

4. In `src/index.css`, add:
   ```css
   html, body, #root {
     height: 100%;
     margin: 0;
     padding: 0;
   }
   ```

---

## What Not to Change

- Do not add routing logic in this part — that is PT2
- Do not add any screen-specific content — placeholder text only

---

## Done When

- [ ] App renders a narrow sidebar on the left and a white/default content area on the right
- [ ] Three icon buttons appear in the sidebar (Chat, Repos, Settings)
- [ ] Settings icon is pinned to the bottom of the sidebar
- [ ] Clicking icons does nothing yet (no routing) — no console errors when clicking
- [ ] Layout fills the full window height with no scrollbar
- [ ] Changelog updated
