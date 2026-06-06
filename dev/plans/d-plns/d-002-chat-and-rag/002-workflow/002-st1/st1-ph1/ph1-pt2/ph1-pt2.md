# Stage 1 / Phase 1 / Part 2 — Add Test Button to SettingsScreen
**Plan:** 002 — Chat and RAG

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described.

---

## Task

Add a "Test Connection" button to `SettingsScreen.tsx` below the Save button. It reads the current form values (not the saved ones), calls `testConnection()` from `api.ts`, and shows a status badge.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src/screens/SettingsScreen.tsx` | Add test state + button + status badge |

---

## Exact Requirements

Look at the existing `SettingsScreen.tsx` before editing. The current structure is:
- `openrouterApiKey` and `selectedModel` state loaded from settings on mount
- A `<form>` with the API key input, model select, and a Save button + "Saved" confirmation
- An empty `<div aria-live="polite">` at the bottom (this is the status area — use it)

1. Add two new state variables:

```typescript
type TestStatus = "idle" | "testing" | "success" | "error";
const [testStatus, setTestStatus] = useState<TestStatus>("idle");
const [testError, setTestError] = useState<string | null>(null);
```

2. Add a `handleTestConnection` async function (outside the form's `onSubmit`):

```typescript
async function handleTestConnection() {
  setTestStatus("testing");
  setTestError(null);
  try {
    await testConnection({ openrouterApiKey, selectedModel });
    setTestStatus("success");
  } catch (err) {
    setTestStatus("error");
    setTestError(err instanceof Error ? err.message : "Unknown error");
  }
}
```

3. Import `testConnection` from `"@/lib/api"`.

4. Replace the existing empty `<div aria-live="polite" ...>` at the bottom of the form with:

```tsx
<div className="space-y-3">
  <button
    className="h-10 rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
    disabled={testStatus === "testing"}
    onClick={handleTestConnection}
    type="button"
  >
    {testStatus === "testing" ? "Testing…" : "Test Connection"}
  </button>
  <div aria-live="polite" className="min-h-5 text-sm">
    {testStatus === "success" && (
      <span className="font-medium text-green-600">Connected</span>
    )}
    {testStatus === "error" && (
      <span className="text-destructive">
        {testError ?? "Connection failed"}
      </span>
    )}
  </div>
</div>
```

This replaces the empty `<div aria-live="polite" ...>` that is currently the last element inside the form.

---

## What Not to Change

- Do not change the Save button or the "Saved" confirmation
- Do not change `settings.ts`, `api.ts`, or any other file

---

## Done When

- [ ] "Test Connection" button appears below the Save button in Settings
- [ ] Clicking it with the form populated shows "Testing…" while in flight
- [ ] A valid API key produces a green "Connected" badge
- [ ] An invalid key produces a red error message (not a thrown JS exception)
- [ ] The button is disabled during testing
- [ ] No API key appears in console or network tab
- [ ] `npm run build` passes
- [ ] Changelog updated
