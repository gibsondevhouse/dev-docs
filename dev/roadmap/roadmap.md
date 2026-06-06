# Project Roadmap — Full Vision

> **For the agent:** This document describes what this project is and what it is meant to become. Read it to understand the direction of the project before making decisions. Do not use it to determine what to work on next — use `active-plan.md` for that. Use this to avoid building things that contradict the vision.

---

## What This Project Is

dev-docs is a desktop app for vibe-coders who know what they want but struggle to articulate it technically. You have a plain-English conversation with DeepSeek, it reads your actual codebase via RAG, and it generates a structured, agent-executable plan in the dev-docs template format. The output lands on disk ready for an AI coding agent to execute — no manual writing required.

---

## Core Principles

_The values or constraints that should guide every decision made in this project._

- **Plain English in, structured plans out.** The user never writes plan files manually. The app does it.
- **Grounded in real code.** Plans are generated from what actually exists on disk, not from memory or assumption.
- **Agent-ready output.** Every exported plan must be immediately executable by a coding agent without further editing.
- **One screen at a time.** The UI stays minimal. No feature gets added unless it directly serves the planning loop.
- **DeepSeek-first.** The app is optimized for DeepSeek's large context window. Other models are secondary.

---

## Feature Map

_Every feature or capability this project has or is intended to have, organized by status._

### Built — Fully implemented and working

- [Feature name]: [One-line description]

### Scaffolded — Exists in the code but incomplete or not functional

- [Feature name]: [One-line description of what's there and what's missing]

### Planned — Decided, not yet started

- [Feature name]: [One-line description]

### Conceptual — Ideas being considered, not yet decided

- [Feature name]: [One-line description and any open questions]

### Out of scope — Explicitly decided NOT to build

- [Feature name]: [One-line reason why]

---

## Open Questions

_Unresolved decisions that will affect what gets built. These should be answered before related plans are started._

- [Question 1]
- [Question 2]