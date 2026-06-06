# Plan NNN — [Plan Name]

## Agent Briefing

You are being handed a plan to execute. Read this document fully before doing anything. Then navigate to the workflow folder for the specific stage, phase, or part you are being asked to execute. Each level has its own prompt file with precise instructions.

**Current working branch:** `plan-NNN-[plan-name]`
**Plan type:** [Development / Polishing / Refactoring / Bugfix]
**Plan number:** NNN
**Plan name:** [Short, descriptive name]

---

## What This Plan Does

[2–4 sentences describing the goal of this plan in plain language. What problem does it solve? What will be different when it's done?]

---

## Codebase Context

Before starting, read the context file for this plan:
`nnn-context/nnn-context.md` — key files, current state, and constraints the agent must know.

If prior sessions have run, check the changelog for what has already been done:
`nnn-context/nnn-changelog.md`

---

## Workflow Map

The plan is broken into stages. Each stage is broken into phases. Each phase is broken into parts.

```
nnn-workflow/
├── nnn-st1/          ← Stage 1: [Stage name]
│   ├── st1-ph1/      ← Phase 1: [Phase name]
│   │   ├── ph1-pt1/  ← Part 1: [Part name]
│   │   └── ph1-pt2/  ← Part 2: [Part name]
│   └── st1-ph2/      ← Phase 2: [Phase name]
└── nnn-st2/          ← Stage 2: [Stage name]
```

**Execution order:** Start at Stage 1 → Phase 1 → Part 1. Complete each part fully before moving to the next. Do not skip ahead.

---

## Stages at a Glance

| Stage | Name | Purpose | Status |
|-------|------|---------|--------|
| ST1 | [Stage 1 name] | [One-line purpose] | Not started |
| ST2 | [Stage 2 name] | [One-line purpose] | Not started |

---

## Definition of Done

This plan is complete when:
- [ ] [Outcome 1 — specific, observable result]
- [ ] [Outcome 2 — specific, observable result]
- [ ] [Outcome 3 — specific, observable result]
- [ ] No errors in the browser console related to this plan's changes
- [ ] The changelog has been updated with a summary of what was done

---

## Rules for Executing This Plan

1. Work only within the scope described in each prompt file. Do not refactor or change things outside the task.
2. After completing each part, update `nnn-context/nnn-changelog.md` with a one-line entry.
3. If you encounter an ambiguity or a blocker, stop and document it in the changelog rather than guessing.
4. Do not proceed to the next stage until all parts and phases in the current stage are checked off.