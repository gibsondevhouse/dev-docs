# Architectural Pivot: Rewiring for Prose

## 1. Frontend: The "Universe" Dashboard
The three-screen layout (Chat, Repos, Settings) needs to evolve into a **Creation Environment**.

*   **Repos Screen $\rightarrow$ Universe Screen:** Users index their story folder. The UI should display a "Lore Tree" (Characters, Locations, Items) and an "Outline Tree" (Acts, Chapters, Scenes) instead of a file list.
*   **Chat Screen $\rightarrow$ The Copilot:** The chat remains the primary input, but the "Preview Pane" becomes a **Staging Area** for AI-proposed changes.
*   **Settings Screen:** Remains largely the same, but adds "Genre Presets" or "Prose Style" configurations.

## 2. Backend (Python Sidecar): Narrative RAG
The `src-python` layer needs a dedicated `services/narrative.py` to replace or augment `services/rag.py`.

*   **Chunking Strategy:** Switch from character-count splitting to **Natural Language Splitting** (splitting at paragraphs or scene breaks `***`).
*   **Metadata Enrichment:** Every lore chunk should be tagged with `type` (character, plot, world) to allow the LLM to filter its own context.
*   **The "Context Orchestrator":** A new logic layer that decides what context to pull. If the user mentions a character, pull their bio. If they mention a location, pull the world-building.

## 3. Storage Strategy: The "Living Folder"
The project should maintain a specific folder structure to enable the agent to work effectively:
```text
/StoryName
  /Drafts        <-- The actual prose
  /Lore          <-- The "Database" (Markdown files per character/place)
  /Outline       <-- The structure
  .novel-index   <-- The ChromaDB vector store
```

## 4. Agentic Interaction Layer (The "Diff" Engine)
We will implement a **Protocol for Proposals**.
1.  **LLM Output:** The AI responds with a specific Markdown block:
    ```json
    {
      "action": "UPDATE_CHARACTER",
      "target": "Lore/Kaelen.md",
      "diff": "+ Eye Color: Emerald Green\n- Eye Color: Blue"
    }
    ```
2.  **Frontend Interception:** The React app parses this JSON, renders a visual diff, and waits for a `handleApprove` event.
3.  **Tauri Execution:** Upon approval, Tauri performs the file write.
