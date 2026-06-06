# Deferred Plans

Plans are moved here when they have been postponed — work started or designed but not continued, or plans that were queued and then deprioritized indefinitely.

## How to Defer a Plan

1. Move the plan folder from its type directory or `active-plan.md` into this folder
2. Update the plan's status to `Deferred` in `master-plan.md`
3. If it was active, remove it from `active-plan.md` and note the blocker or reason
4. Add a note inside the plan's `nnn-context/nnn-changelog.md` explaining why it was deferred

## Reactivating a Deferred Plan

1. Move the folder back to the appropriate type directory (`d-plns/`, `p-plns/`, `r-plns/`)
2. Update status to `Queued` in `master-plan.md`
3. Add it to the execution queue in `roadmap/dev-map.md`
4. Review `nnn-context/nnn-context.md` — it may be outdated and need updating before execution
