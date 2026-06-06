# Roadmap — How This Works

---

## Files in This Folder

| File | Purpose | Updated when |
|------|---------|-------------|
| `roadmap.md` | Full project vision — every feature by status | The vision changes or a feature moves status |
| `dev-map.md` | Sequenced queue of upcoming plans and reasoning | A plan completes, is added, or is deferred |

---

## How These Files Relate to the Plans Folder

- `roadmap.md` answers: **What is this project trying to become?**
- `dev-map.md` answers: **What should be built next, and in what order?**
- `plans/active-plan.md` answers: **What is being built right now, and where did we leave off?**

Agents working on a task need `active-plan.md` and the specific plan files. The roadmap files are context, not instructions.

---

## Rules for Updating the Roadmap

- Only the project owner should rewrite the vision or re-prioritize the queue
- Agents may append to "Recently Completed" in `dev-map.md` after finishing a plan
- Agents should never remove features from `roadmap.md` — mark them "Out of scope" with a reason instead