# Pathway to Completion: The Novel Engine Roadmap

## Phase 1: The Plumbing (Current - 1 Week)
*Objective: Finalize the Plan Builder core so the engine is "running."*
1.  Complete **Plan 002** (Chat & RAG).
2.  Ensure Python sidecar is stable and streaming correctly to the React frontend.
3.  Verify ChromaDB persistence.

## Phase 2: The Domain Pivot (2 Weeks)
*Objective: Transform the UI and RAG for creative writing.*
1.  **Rename & Rebrand:** Change "Plan Builder" to "Novel Engine" (or chosen name).
2.  **Narrative Indexing:** Implement paragraph-based chunking in `src-python`.
3.  **Universe View:** Build the "Lore Tree" UI to visualize the indexed story folder.

## Phase 3: Agentic Intelligence (3 Weeks)
*Objective: Implement the Proposal/Approval workflow.*
1.  **Tool-Calling System:** Define the JSON schema for LLM actions (Create Character, Update Outline).
2.  **The Staging UI:** Create the React component for rendering diffs and "Approve/Reject" buttons.
3.  **Safe-Write Bridge:** Build the Tauri commands to safely modify the local story files.

## Phase 4: Creative Mastery (4 Weeks)
*Objective: Add "Smart" narrative features.*
1.  **Consistency Checker:** A background task that flags lore contradictions.
2.  **Character Voice Profiles:** Allow the user to define "Voices" for different characters that the AI adopts during conversation.
3.  **Outline Sync:** The AI can automatically update the "Master Outline" as the user chats about new ideas.

## Phase 5: The "Holeshot" Release (Final)
*Objective: Polish and Export.*
1.  **Prose Export:** One-click export of the entire story universe into a single PDF or structured Archive.
2.  **The "Vibe-to-Volume" Experience:** Optimized onboarding where a 1-sentence prompt generates a 10-chapter outline.
