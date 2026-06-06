# Stage 5 / Phase 1 — Agent System Prompt + Structured Output
**Plan:** 001 — Plan Builder UI

> **For the agent:** This phase defines the plan builder agent's system prompt and the JSON schema it outputs. Complete all parts in order. When done, update the changelog.

---

## Phase Goal

The agent in the chat understands the plan template structure, guides the user through defining a plan via conversation, and outputs a structured JSON block when the plan is sufficiently defined. The JSON represents the full plan folder/file structure ready for rendering and export.

---

## Parts in This Phase

| Part | Folder | Task | Status |
|------|--------|------|--------|
| PT1 | `ph1-pt1/` | Plan builder system prompt | Not started |
| PT2 | `ph1-pt2/` | Structured plan JSON output schema | Not started |

---

## Context for This Phase

The system prompt is injected by the Python `/chat` endpoint as the first message in the `messages` array (role: "system"). The structured JSON must be defined both in Python (as a Pydantic model for validation) and in TypeScript (for the frontend planStore). The agent is instructed to always end its plan-ready response with a JSON block wrapped in `<plan-json>` tags so the frontend can detect and parse it.

---

## Acceptance Criteria

- [ ] All parts in this phase are done
- [ ] A new chat session greets the user and asks them to describe their plan idea
- [ ] The agent asks follow-up questions to define plan type, stages, phases, and parts
- [ ] When the user confirms the plan is ready, the agent outputs a `<plan-json>` block
- [ ] The JSON matches the defined schema (validated in Python before sending)
- [ ] The TypeScript types for the plan JSON are defined in `src/types/plan.ts`
