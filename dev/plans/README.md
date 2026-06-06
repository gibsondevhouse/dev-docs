# Plans — How This System Works

> **For the agent:** Read this once to understand the system. Then navigate to `active-plan.md` to find your actual work.

---

## What a Plan Is

A plan is a self-contained unit of work with a defined scope, a structured workflow, and enough context for an agent to execute it without needing to ask questions. Each plan lives in its own folder and is broken down into Stages → Phases → Parts.

---

## Folder Structure

```
plans/
├── active-plan.md        ← START HERE every session
├── master-plan.md        ← full inventory of all plans
├── README.md       ← this file
├── d-plns/               ← development plans (new features, bug fixes)
├── p-plns/               ← polishing plans (UX, visuals, minor fixes)
├── r-plns/               ← refactoring plans (code quality, performance)
├── archive/
│   ├── completed-plans/  ← finished plans moved here when done
│   └── deferred-plans/   ← postponed plans moved here
└── _templates/  ← copy this to create a new plan
```

---

## Plan Types

| Prefix | Folder | Use for |
|--------|--------|---------|
| `d` | `d-plns/` | New features, functionality, bug fixes |
| `p` | `p-plns/` | Visual polish, UX improvements, minor tweaks |
| `r` | `r-plns/` | Restructuring code without changing behavior |

---

## How to Create a New Plan

1. Copy `_templates/` into the appropriate type folder
2. Rename it following the convention: `x-nnn-plan_name.md/` (e.g. `d-001-login-flow.md/`)
3. Replace all `nnn` references inside the files with the plan number
4. Fill in `nnn.md` (the master brief) and `nnn-context/nnn-context.md` before handing to an agent
5. Add the plan to `master-plan.md`
6. When it is the next plan to execute, add it to `active-plan.md`

---

## Plan Lifecycle

```
Created → Queued (in master-plan.md) → Active (in active-plan.md) → Complete → Archived
                                                                   → Deferred → archive/deferred-plans/
```

---

## Rules for Agents

- Never work outside the scope of the active plan
- Always read `active-plan.md` before starting
- Always update `active-plan.md` and the plan's changelog after finishing
- If a plan is complete, move its folder to `archive/completed-plans/` and remove it from `active-plan.md`
- If a plan is blocked and cannot continue, mark it deferred in `master-plan.md` and note the reason