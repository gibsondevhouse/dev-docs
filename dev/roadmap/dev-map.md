# Dev Map — What's Next and Why

> **For the agent:** This document shows the sequence of upcoming plans and the reasoning behind the order. It is maintained by the human owner of the project. Agents should read it for context but should not modify it unless instructed. To know what to work on right now, use `active-plan.md`.

---

## Current Focus

[One paragraph describing the current phase of development. What is being built or fixed right now, and why is it the priority?]

---

## Execution Queue

_Plans listed in the order they should be executed. The top of the list is next._

| Priority | Plan # | Name | Type | Depends On | Notes |
|----------|--------|------|------|------------|-------|
| 1 | [NNN] | [Plan name] | [d/p/r] | None | [Why this is first] |
| 2 | [NNN] | [Plan name] | [d/p/r] | Plan [NNN] | [Why this follows] |
| 3 | [NNN] | [Plan name] | [d/p/r] | None | [Notes] |

---

## Plans That Need to Be Drafted

_Ideas or needs that have been identified but don't have a plan folder yet. These should be turned into plans before they can be queued._

- [Plan idea]: [What it would do and why it's needed]
- [Plan idea]: [What it would do and why it's needed]

---

## Recently Completed

_Log of the last few completed plans, most recent first. Helps understand what was just changed._

| Date | Plan # | Name | Outcome |
|------|--------|------|--------|
| [YYYY-MM-DD] | [NNN] | [Plan name] | [One-line summary of what changed] |

---

## How to Update This File

Update this file when:
- A plan completes → move it to "Recently Completed" and remove from the queue
- A new plan is decided → add it to the queue in the right priority position
- A plan is deferred → remove from queue and note it in `master-plan.md`
- The project's focus shifts → rewrite "Current Focus" to reflect the new direction