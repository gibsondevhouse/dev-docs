# Stage 5 / Phase 2 — planStore and Chat-to-Plan Sync
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase creates the Zustand planStore and wires the streaming chat parser to detect and extract the plan JSON block. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

A `planStore` Zustand store holds the in-progress plan data. The chat message streaming logic scans assistant responses for `<plan-json>` blocks and, when found, parses and stores them in `planStore`. The preview panel reacts to `planStore` changes.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph2-pt1/` | planStore (Zustand) | Not started |
| PT2 | `ph2-pt2/` | Scan streaming output for plan JSON + sync to planStore | Not started |

---

## Context for This Phase

`chatStore` and streaming are already set up. This phase adds a parallel store (`planStore`) that is updated as a side effect of receiving a plan JSON from the agent. The preview panel (ST6) will subscribe to `planStore`.

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] `planStore` exposes `plan`, `setPlan`, and `clearPlan`
- [ ] When the agent outputs a `<plan-json>` block, it is automatically parsed and stored in `planStore`
- [ ] Invalid JSON blocks are caught and logged without crashing the app
- [ ] The preview placeholder updates when `planStore.plan` changes (log the plan to console until ST6 implements the full preview)
