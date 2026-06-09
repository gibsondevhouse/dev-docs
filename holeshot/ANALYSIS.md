# Holeshot Analysis: From Plan Builder to Novel Engine

## 1. Executive Summary
The current codebase, **Plan Builder**, is a sophisticated tool for translating technical "vibes" into executable code plans. It uses a **Tauri + React + Python (FastAPI)** stack with **RAG (LlamaIndex/ChromaDB)**. To achieve the "Agentic Novel Engine" vision, we must pivot from technical planning to **Creative Continuity Management**.

The core "engine" (LLM + RAG + Local File Storage) remains valid, but the data models, UX patterns, and agentic behaviors must be fundamentally rewired.

## 2. Current State vs. Future Goal

| Feature | Current (Plan Builder) | Future (Novel Engine) |
| --- | --- | --- |
| **Primary Unit** | A "Project" (Repo) | A "Story Universe" |
| **RAG Target** | Code files (.ts, .py) | Story files (.md, .txt) |
| **Intelligence** | Coding logic & Architecture | Narrative arc, Tone, Lore consistency |
| **Output** | `.md` Plan files | `.md` Drafts, Character Sheets, Timelines |
| **Agentic Role** | Proposing code steps | Proposing lore/plot updates with diffs |

## 3. The "Holeshot" Gap Analysis

### A. The Semantic Gap
The current RAG system is tuned for code. Code is hierarchical and logical. Prose is semantic and emotional. 
*   **Gap:** We need "Semantic Prose Chunking" that understands a "Scene" or a "Character Beat" rather than a "Function" or "Class."

### B. The Control Gap
The current UI is a chat window. 
*   **Gap:** The "Novel Engine" requires a **Shared State** UI where the AI can "reach out" of the chat to modify a character's eye color or add a new chapter to the outline, requiring a "Proposal/Approval" layer.

### C. The Continuity Gap
Plan Builder doesn't track long-term state across sessions except via the RAG index.
*   **Gap:** A novel needs a **Knowledge Graph**. Kaelen shouldn't just be a name in a vector store; Kaelen should be a "Node" with attributes that the AI actively manages.

## 4. Immediate Technical Risks
1.  **Context Window Bloat:** Novels are long. RAG retrieval must be extremely precise to avoid feeding the LLM 100k tokens of irrelevant backstory.
2.  **File System Safety:** The agentic ability to write files must be strictly gated behind user approval to prevent accidental overwriting of creative work.
3.  **Model Choice:** DeepSeek is great for code, but we may need to evaluate models with higher "Creative Temperature" or prose-specific fine-tuning.
