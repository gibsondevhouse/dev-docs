# Stage 1 / Phase 2 / Part 2 — React Router v6 with Placeholder Screens
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Add React Router v6, wire the sidebar nav buttons to routes, and create three placeholder screen components: Chat, Repos, and Settings.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/main.tsx` | Wrap app in `<BrowserRouter>` |
| `src/App.tsx` | Add `<Routes>` inside `<AppShell>`, wire default redirect |
| `src/components/layout/Sidebar.tsx` | Use `useNavigate` and `useLocation` for routing + active state |
| `src/screens/ChatScreen.tsx` | Create: placeholder |
| `src/screens/ReposScreen.tsx` | Create: placeholder |
| `src/screens/SettingsScreen.tsx` | Create: placeholder |

---

## Exact Requirements

1. Install React Router:
   ```bash
   npm install react-router-dom
   ```

2. In `src/main.tsx`, wrap `<App />` in `<BrowserRouter>`:
   ```tsx
   import { BrowserRouter } from "react-router-dom";
   // ...
   <BrowserRouter><App /></BrowserRouter>
   ```

3. Create three placeholder screen files in `src/screens/`:
   - `ChatScreen.tsx`: renders `<div className="p-6 text-2xl font-semibold">Chat</div>`
   - `ReposScreen.tsx`: renders `<div className="p-6 text-2xl font-semibold">Repos</div>`
   - `SettingsScreen.tsx`: renders `<div className="p-6 text-2xl font-semibold">Settings</div>`

4. Update `src/App.tsx` to use `<Routes>`:
   ```tsx
   import { Routes, Route, Navigate } from "react-router-dom";

   // Inside AppShell:
   <Routes>
     <Route path="/" element={<Navigate to="/chat" replace />} />
     <Route path="/chat" element={<ChatScreen />} />
     <Route path="/repos" element={<ReposScreen />} />
     <Route path="/settings" element={<SettingsScreen />} />
   </Routes>
   ```

5. Update `Sidebar.tsx` to use `useNavigate` and `useLocation`:
   - Use `useLocation().pathname` to determine which route is active
   - Pass `isActive={location.pathname === "/chat"}` (etc.) to each button
   - Wire each button's `onClick` to `navigate("/chat")` (etc.)

---

## What Not to Change

- Do not add any real content to the screen components — they are placeholders
- Do not modify the AppShell layout from PT1

---

## Done When

- [ ] Clicking "Chat" icon navigates to `/chat` and shows "Chat" heading
- [ ] Clicking "Repos" icon navigates to `/repos` and shows "Repos" heading
- [ ] Clicking "Settings" icon navigates to `/settings` and shows "Settings" heading
- [ ] The active sidebar icon is visually highlighted on each screen
- [ ] Default route `/` redirects to `/chat`
- [ ] No console errors
- [ ] Changelog updated
