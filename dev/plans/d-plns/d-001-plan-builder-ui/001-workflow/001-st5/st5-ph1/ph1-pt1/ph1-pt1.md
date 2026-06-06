# Stage 5 / Phase 1 / Part 1 — Plan Builder System Prompt
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Add the plan builder system prompt to the Python sidecar. When the chat endpoint is called, prepend this system prompt as the first message so the agent knows its role and the template structure it must follow.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-python/services/plan_builder.py` | Create: system prompt + plan JSON schema (Pydantic) |
| `src-python/routers/chat.py` | Inject system prompt as first message |

---

## Exact Requirements

1. Create `src-python/services/plan_builder.py` with the system prompt:

   ```python
   PLAN_BUILDER_SYSTEM_PROMPT = """
   You are a Plan Builder assistant. Your job is to help the user design a structured software development plan, then generate a precise JSON representation of that plan.

   The plan system uses this hierarchy:
   - Plan: top-level container with a number, type, and name
   - Stages (ST): major blocks of work
   - Phases (PH): focused sub-blocks within a stage
   - Parts (PT): atomic tasks within a phase

   Plan types:
   - d (Development): new features, bug fixes
   - p (Polishing): UX, visuals, minor tweaks
   - r (Refactoring): code quality, restructuring

   Your process:
   1. Greet the user and ask them to describe what they want to build or fix.
   2. Ask follow-up questions until you understand:
      - What type of plan it is (d/p/r)
      - A short descriptive name (lowercase, hyphens, no spaces)
      - What the overall goal is (2-4 sentences)
      - The main stages needed to complete the work
      - For each stage: the phases, and for each phase: the key parts (tasks)
   3. When you have enough detail, summarize the plan and ask the user to confirm.
   4. Once confirmed, output the full plan as a JSON block wrapped in <plan-json> tags.

   Rules:
   - Always use sequential numbering for plans (ask the user for the plan number, or default to 001)
   - Keep stage, phase, and part names short and specific
   - Each part should be one atomic, testable task
   - Never output the <plan-json> block until the user has confirmed the plan
   - After outputting the JSON, ask if the user wants to adjust anything
   """
   ```

2. In `src-python/routers/chat.py`, inject the system prompt as the first message if it is not already present:

   ```python
   from services.plan_builder import PLAN_BUILDER_SYSTEM_PROMPT

   @router.post("/chat")
   async def chat(req: ChatRequest):
       messages = req.messages.copy()

       # Prepend system prompt if not already the first message
       if not messages or messages[0].get("role") != "system":
           messages.insert(0, {"role": "system", "content": PLAN_BUILDER_SYSTEM_PROMPT})

       # ... existing RAG injection and streaming ...
   ```

   Preserve the existing RAG context injection logic — it still runs after the system prompt injection.

---

## What Not to Change

- Do not change the streaming logic
- Do not define the JSON schema yet — that is PT2
- Do not change any frontend files in this part

---

## Done When

- [ ] A new conversation's first message from the assistant greets the user and asks about their plan idea
- [ ] The agent asks clarifying questions about stages, phases, and parts before proposing a plan
- [ ] Verified by sending 3-4 messages to test the guided conversation flow
- [ ] Changelog updated
