# Stage 1 / Phase 1 / Part 1 — Init Tauri + Vite + React Project
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Scaffold a new Tauri v2 desktop app with a Vite + React + TypeScript frontend, then add Tailwind CSS and install shadcn/ui.

---

## Files to Touch

| File | What to do |
|------|------------|
| `plan-builder/` | Create this directory (project root) |
| `plan-builder/src-tauri/tauri.conf.json` | Set window title, size, and app identifier |
| `plan-builder/src/index.css` | Add Tailwind directives |
| `plan-builder/tailwind.config.js` | Created by Tailwind init |
| `plan-builder/vite.config.ts` | Verify Tauri plugin is present after scaffold |

---

## Exact Requirements

1. In your chosen projects directory, run:
   ```bash
   npm create tauri-app@latest plan-builder -- --template react-ts
   cd plan-builder
   npm install
   ```

2. Install Tailwind CSS:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. Configure `tailwind.config.js` — set `content` to:
   ```js
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
   ```

4. Add Tailwind directives to `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Install shadcn/ui prerequisites and initialize:
   ```bash
   npm install -D @types/node
   npx shadcn@latest init
   ```
   When prompted, choose: TypeScript → yes, style → Default, base color → Slate, CSS variables → yes, tailwind config → tailwind.config.js, components → `src/components/ui`, utils → `src/lib/utils.ts`.

6. In `src-tauri/tauri.conf.json`, update:
   - `productName`: `"Plan Builder"`
   - `identifier`: `"com.planbuilder.app"`
   - Window `width`: `1280`, `height`: `800`
   - Window `title`: `"Plan Builder"`
   - `minWidth`: `900`, `minHeight`: `600`

7. Run `npm run tauri dev` and confirm the app window opens without errors.

---

## What Not to Change

- Do not modify any Rust source files in `src-tauri/src/` in this part
- Do not add any React components yet — just the scaffold and tooling

---

## Done When

- [ ] `npm run tauri dev` opens a native desktop window showing the default Vite+React screen
- [ ] Tailwind classes work (verify by adding `className="text-blue-500"` to a test element and removing it after)
- [ ] shadcn/ui initialized (components.json exists, `src/lib/utils.ts` exists)
- [ ] Window is titled "Plan Builder" and sized 1280×800
- [ ] No TypeScript or build errors
- [ ] Changelog updated
