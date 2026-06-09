# Specification: The Agentic Workflow (Diffs & Approvals)

## 1. Overview
The "Agentic" nature of the engine comes from the AI's ability to act on the file system. To maintain user trust, every "Action" is a **Proposal** until the user clicks **Approve**.

## 2. The Communication Loop
1.  **User Input:** "Give Kaelen a dark past involving a lost kingdom."
2.  **AI Analysis:**
    *   Finds `Lore/Characters/Kaelen.md` via RAG.
    *   Determines that an update is needed.
3.  **AI Response:** 
    *   A conversational reply: "I've drafted a backstory for Kaelen. He's now the exiled prince of the Sunken Isles."
    *   A hidden (or visible) **Action Block**.

## 3. The Action Block Schema
We will use a fenced code block with a custom language identifier `novel-action`:
~~~text
```novel-action
{
  "id": "proposal_123",
  "type": "FILE_UPDATE",
  "path": "Lore/Characters/Kaelen.md",
  "operation": "replace",
  "search": "Backstory: Unknown",
  "replace": "Backstory: Exiled prince of the Sunken Isles, seeking the Silver Key.",
  "justification": "Provides the requested 'dark past' and ties into the 'Lost Kingdom' lore."
}
```
~~~

## 4. Frontend Rendering (React)
The `MessageList` component will have a special renderer for `novel-action` blocks:
*   **Component:** `ProposalCard.tsx`
*   **Visuals:**
    *   A "Diff" view showing the Red (Old) and Green (New) text.
    *   A "Reasoning" tooltip using the `justification` field.
    *   Buttons: `[ Reject ]` `[ Approve ]`

## 5. The "Approve" Sequence
1.  User clicks **Approve**.
2.  React calls `invoke("apply_proposal", { action: ... })`.
3.  **Tauri (Rust)**:
    *   Reads the file at `path`.
    *   Applies the `replace`.
    *   Writes to disk.
    *   Triggers a **RAG Re-index** for that specific file so the AI "remembers" its own change immediately.

## 6. Multi-File Proposing
The engine must support "Transaction" proposals. If a user says "Create a new character and link them to the main plot," the AI can output a **list** of actions. The UI should allow "Approve All" or individual approvals.
