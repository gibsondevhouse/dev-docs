# Stage 1 / Phase 2 — Base Layout + Routing
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase builds the app shell: a persistent sidebar with navigation links and a main content area where screens are rendered. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The app has a two-column layout (narrow sidebar + wide main area) and three navigable screens: Chat, Settings, and Repos. Each screen renders a placeholder with its name. React Router v6 handles navigation.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph2-pt1/` | App shell (AppShell + Sidebar components) | Done |
| PT2 | `ph2-pt2/` | React Router v6 with three placeholder screens | Done |

---

## Context for This Phase

PH1 must be complete before starting this phase. The Tauri + Vite project exists with Tailwind and shadcn/ui available.

The sidebar should show three items: **Chat** (default), **Repos**, **Settings**. The active route should be visually highlighted in the sidebar.

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] App renders a sidebar on the left and content area on the right
- [ ] Clicking each sidebar item navigates to the correct placeholder screen
- [ ] Active route is highlighted in the sidebar
- [ ] Layout is responsive within the fixed window size (no horizontal scrollbar)
- [ ] No console errors
