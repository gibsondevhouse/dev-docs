---
name: dev-docs-design
description: Use this skill to generate well-branded interfaces and assets for dev-docs (the "Plan Builder" desktop app for vibe-coders), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

`readme.md` is the full design guide — product context, the planning methodology that drives the brand, CONTENT FUNDAMENTALS (voice), VISUAL FOUNDATIONS, and ICONOGRAPHY. Start there.

Key files:
- `styles.css` — global entry point; link it (or `@import` it) to get every token. No webfonts (system-native by design).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`.
- `components/` — React primitives (`Button`, `IconButton`, `Input/Field/Select/Textarea`, `Card`, `Badge`, `StatusBadge`, `PlanTypeTag`). Each has a `.prompt.md` with usage.
- `ui_kits/plan-builder/` — the full interactive app recreation (Chat · Repos · Settings); `ui.jsx` + `kit.css` are copy-pasteable token-driven primitives.
- `guidelines/` — foundation specimen cards.
- `assets/README.md` — wordmark + Lucide iconography notes.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view — reuse `ui_kits/plan-builder/kit.css` + `ui.jsx` as ready-made, token-driven components. If working on production code, copy assets and read the rules here to become an expert in designing with this brand (the live app is shadcn/ui + Tailwind + lucide-react; the `*-hsl` color tokens drop straight into `hsl(var(--x))`).

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Brand in one breath:** a flat, document-first developer tool — "structured planning doc meets terminal." Light content, dark zinc chrome. Color is for meaning (plan status/type, success, error), never decoration. Quiet near-black primary buttons. Borders over shadows. Mono carries the identity (plan IDs, paths, logs). Terse UI copy; imperative "for the agent" docs. No emoji, no gradients, no photography.
