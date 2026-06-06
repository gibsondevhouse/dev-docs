# Stage 2 / Phase 2 / Part 2 — Connection Test Button + Status Indicator
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Add a "Test Connection" button to the Settings screen. When clicked, it sends a minimal chat request to `POST /chat` using the currently saved API key and model, and displays the result as a status badge.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/screens/SettingsScreen.tsx` | Add Test Connection button + status display |
| `src/lib/api.ts` | Create: typed HTTP client functions for the sidecar |

---

## Exact Requirements

1. Create `src/lib/api.ts` with a function to test the connection:

   ```typescript
   import { SIDECAR_URL } from "./sidecar";
   import { AppSettings } from "./settings";

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
       const text = await response.text();
       throw new Error(`HTTP ${response.status}: ${text}`);
     }

     // Read first SSE chunk as confirmation
     const reader = response.body!.getReader();
     const { value } = await reader.read();
     reader.cancel();
     const text = new TextDecoder().decode(value);
     return text.includes("data:") ? "connected" : "unexpected response";
   }
   ```

2. In `src/screens/SettingsScreen.tsx`, add below the Save button:
   - A "Test Connection" button (secondary style, smaller than Save)
   - A status area that shows one of:
     - Nothing (initial state)
     - A spinner + "Testing..." while in flight
     - A green badge "Connected" on success
     - A red badge with truncated error message on failure
   - Use local React state: `testStatus: "idle" | "testing" | "success" | "error"`
   - `testError: string | null` for the error message

3. The Test Connection button reads the current form values (not necessarily saved ones), so the user can test before saving.

---

## What Not to Change

- Do not change the Save button behavior
- Do not change any other screen

---

## Done When

- [ ] "Test Connection" button appears below the Save button in Settings
- [ ] Clicking it shows a spinner while waiting
- [ ] A valid API key + model shows a green "Connected" badge
- [ ] An invalid API key shows a red error badge (not a JS exception in the console)
- [ ] The test reads the current form input, not the saved value (so user can test before saving)
- [ ] No API key logged anywhere
- [ ] Changelog updated
