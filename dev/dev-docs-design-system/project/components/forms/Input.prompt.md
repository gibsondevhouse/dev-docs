**Input / Field** — dev-docs single-line text field with the h-10 bordered look and a 2px focus ring. Wrap with `<Field>` for a label and hint/error.

```jsx
<Field label="OpenRouter API Key" hint="Stored in the macOS Keychain">
  <Input type="password" placeholder="sk-or-..." mono />
</Field>
```

`invalid` turns the border red. `mono` renders the value in the monospace stack (API keys, file paths). `<Field error="...">` shows a red message below and overrides `hint`.
