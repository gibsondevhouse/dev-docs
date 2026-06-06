# Stage 5 / Phase 2 / Part 2 — Scan Streaming Output for Plan JSON + Sync to planStore
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Update the streaming logic in `ChatView` to scan each completed assistant message for a `<plan-json>` block. When found, parse the JSON and store it in `planStore`.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/components/chat/ChatView.tsx` | Add plan JSON detection after streaming completes |
| `src/lib/planParser.ts` | Create: utility to extract and parse plan JSON from text |

---

## Exact Requirements

1. Create `src/lib/planParser.ts`:

   ```typescript
   import { Plan } from "../types/plan";

   export function extractPlanJson(text: string): Plan | null {
     const match = text.match(/<plan-json>([\s\S]*?)<\/plan-json>/);
     if (!match) return null;
     try {
       return JSON.parse(match[1].trim()) as Plan;
     } catch (e) {
       console.warn("Failed to parse plan JSON:", e);
       return null;
     }
   }
   ```

2. In `src/components/chat/ChatView.tsx`, after streaming completes (after `setStreaming(false)`):

   ```typescript
   import { extractPlanJson } from "../lib/planParser";
   import { usePlanStore } from "../store/planStore";

   const { setPlan } = usePlanStore();

   // After streaming is done:
   const lastMessage = messages[messages.length - 1];
   if (lastMessage?.role === "assistant") {
     const plan = extractPlanJson(lastMessage.content);
     if (plan) {
       setPlan(plan);
       console.log("Plan extracted and stored:", plan);
     }
   }
   ```

3. In `ChatView.tsx`'s preview panel placeholder div, subscribe to `planStore` and show a brief indicator when a plan is available:
   ```tsx
   const { plan } = usePlanStore();
   // In the preview column:
   {plan
     ? <div className="p-4 text-sm text-green-600">Plan ready: {plan.name} ({plan.stages.length} stages)</div>
     : <div className="p-4 text-sm text-zinc-400">Plan preview will appear here.</div>
   }
   ```

---

## What Not to Change

- Do not build the full preview yet — that is ST6
- Do not change the streaming logic itself, only add post-stream processing

---

## Done When

- [ ] After a full conversation where the agent outputs `<plan-json>`, `planStore.plan` is populated
- [ ] The preview placeholder updates to show "Plan ready: [name] (N stages)"
- [ ] Invalid or missing `<plan-json>` does not crash the app
- [ ] `console.log` shows the parsed plan object in the DevTools console
- [ ] Changelog updated
