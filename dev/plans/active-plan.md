# Active Plan Status

> **For the agent:** This is your entry point. Read this file first every time you begin a session. It tells you exactly what to work on, where to pick up, and what to watch out for. Do not start any work before reading this.

---

## Currently Active Plans

_List each plan that is currently in progress. One section per plan._

---

### Plan 002 — Chat and RAG

- **Type:** Development
- **Plan folder:** `d-plns/d-002-chat-and-rag/`
- **Main brief:** `d-plns/d-002-chat-and-rag/002.md`
- **Pick up at:** Stage 1 → Phase 1 → Part 1 — `002-workflow/002-st1/st1-ph1/ph1-pt1/ph1-pt1.md`
- **Last completed:** Plan document fully created (ST1 + ST2 + ST3). App is running. Settings screen is functional. Chat and RAG have not been implemented yet.
- **Status:** Ready

**Blockers:** None. All deps declared. OpenRouter API key required for ST1 PH1 PT2 (connection test) and full chat streaming.

---

## Parallel Execution

_Can any active plans run at the same time without conflicting? Note it here._

| Plan A | Plan B | Can run in parallel? | Notes |
|--------|--------|----------------------|-------|
| [NNN]  | [NNN]  | Yes / No             | [Why or why not] |

If no parallel plans exist, write: _All plans must run sequentially. See order below._

**Execution order:** [NNN] → [NNN] → [NNN]

---

## Global Blockers

_Anything broken or unstable in the codebase that affects all plans. Agents must not proceed if a global blocker is active._

- None

---

## How to Update This File

After each session, the agent must update this file:
1. Change "Pick up at" to reflect the next uncompleted part
2. Update "Last completed" with a one-line summary
3. Change status to "Blocked" if a blocker was hit, and describe it
4. If a plan is fully complete, remove it from this file and move the plan folder to `archive/completed-plans/`
