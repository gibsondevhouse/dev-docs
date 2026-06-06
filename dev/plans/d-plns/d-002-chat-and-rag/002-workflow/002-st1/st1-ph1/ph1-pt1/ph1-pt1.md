# Stage 1 / Phase 1 / Part 1 — Create src/lib/api.ts
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Create `src/lib/api.ts` — a typed HTTP client for the Python sidecar. For now it only needs one function: `testConnection`.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/lib/api.ts` | Create from scratch |

---

## Exact Requirements

Create `src/lib/api.ts` with the following content exactly:

```typescript
import { SIDECAR_URL } from "./sidecar";
import type { AppSettings } from "./settings";

export interface ExportResult {
  files_written: number;
  root_path: string;
}

/**
 * Sends a minimal one-message chat request to POST /chat and reads the
 * first SSE data event as a connectivity check.
 *
 * Returns "connected" on success.
 * Throws an Error with a human-readable message on failure.
 */
export async function testConnection(settings: AppSettings): Promise<string> {
  const response = await fetch(`${SIDECAR_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: settings.openrouterApiKey,
      model: settings.selectedModel,
      messages: [{ role: "user", content: "Reply with only the word: OK" }],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const { value } = await reader.read();
  reader.cancel();

  const text = new TextDecoder().decode(value ?? new Uint8Array());
  if (!text.includes("data:")) throw new Error("Unexpected response format");

  return "connected";
}
```

No other functions yet — they will be added in later parts.

---

## What Not to Change

- Do not modify any existing files
- Do not add a `streamChat` function yet — that is ST2 PH2

---

## Done When

- [ ] `src/lib/api.ts` exists with the exact content above
- [ ] `npm run build` (or `tsc --noEmit`) passes with no TypeScript errors
- [ ] Changelog updated
