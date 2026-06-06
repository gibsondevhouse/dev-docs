# Stage 5 / Phase 2 / Part 1 — planStore (Zustand)
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Create a Zustand `planStore` that holds the current in-progress plan data.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/store/planStore.ts` | Create: Zustand store for plan state |

---

## Exact Requirements

1. Create `src/store/planStore.ts`:

   ```typescript
   import { create } from "zustand";
   import { Plan } from "../types/plan";

   interface PlanState {
     plan: Plan | null;
     setPlan: (plan: Plan) => void;
     clearPlan: () => void;
   }

   export const usePlanStore = create<PlanState>((set) => ({
     plan: null,
     setPlan: (plan) => set({ plan }),
     clearPlan: () => set({ plan: null }),
   }));
   ```

---

## What Not to Change

- Do not connect planStore to chatStore yet — that is PT2
- Do not change any component yet

---

## Done When

- [ ] `src/store/planStore.ts` exists and exports `usePlanStore`
- [ ] TypeScript compiles without errors
- [ ] Changelog updated
