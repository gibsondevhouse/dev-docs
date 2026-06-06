# Stage 5 / Phase 1 / Part 2 — Structured Plan JSON Output Schema
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Define the plan JSON schema in Python (Pydantic) and TypeScript. Update the system prompt to include the exact JSON schema the agent must output. Add an example of valid output to the prompt.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/services/plan_builder.py` | Add Pydantic schema + update system prompt with schema example |
| `src/types/plan.ts` | Create: TypeScript types matching the Python schema |

---

## Exact Requirements

1. Add Pydantic models to `src-python/services/plan_builder.py`:

   ```python
   from pydantic import BaseModel

   class PlanPart(BaseModel):
       id: str          # e.g. "ph1-pt1"
       name: str        # e.g. "Init Tauri project"
       description: str # one sentence task description

   class PlanPhase(BaseModel):
       id: str          # e.g. "st1-ph1"
       name: str        # e.g. "Tauri + Python sidecar setup"
       goal: str        # one sentence phase goal
       parts: list[PlanPart]

   class PlanStage(BaseModel):
       id: str          # e.g. "001-st1"
       name: str        # e.g. "Scaffolding"
       goal: str        # one sentence stage goal
       phases: list[PlanPhase]

   class Plan(BaseModel):
       number: str      # e.g. "001"
       type: str        # "d", "p", or "r"
       name: str        # e.g. "plan-builder-ui"
       description: str # 2-4 sentence overview
       stages: list[PlanStage]
   ```

2. Append the schema example to `PLAN_BUILDER_SYSTEM_PROMPT`. Add this section at the end:

   ```
   When you output the plan JSON, it must match exactly this structure, wrapped in <plan-json> tags:

   <plan-json>
   {
     "number": "001",
     "type": "d",
     "name": "example-feature",
     "description": "Adds example feature to the app.",
     "stages": [
       {
         "id": "001-st1",
         "name": "Setup",
         "goal": "Project is scaffolded and runnable.",
         "phases": [
           {
             "id": "st1-ph1",
             "name": "Init",
             "goal": "Project initialized.",
             "parts": [
               { "id": "ph1-pt1", "name": "Create project", "description": "Run the scaffold command." }
             ]
           }
         ]
       }
     ]
   }
   </plan-json>
   ```

3. Create `src/types/plan.ts`:
   ```typescript
   export interface PlanPart {
     id: string;
     name: string;
     description: string;
   }

   export interface PlanPhase {
     id: string;
     name: string;
     goal: string;
     parts: PlanPart[];
   }

   export interface PlanStage {
     id: string;
     name: string;
     goal: string;
     phases: PlanPhase[];
   }

   export interface Plan {
     number: string;
     type: string;
     name: string;
     description: string;
     stages: PlanStage[];
   }
   ```

---

## What Not to Change

- Do not validate the JSON in the streaming output yet — parsing happens in ST5 PH2 PT2

---

## Done When

- [ ] `PLAN_BUILDER_SYSTEM_PROMPT` includes the schema example with `<plan-json>` tags
- [ ] The agent outputs a `<plan-json>` block when asked to generate the plan in a test conversation
- [ ] The JSON in the block matches the schema structure (manually verified)
- [ ] `src/types/plan.ts` exists with all five TypeScript interfaces
- [ ] Changelog updated
