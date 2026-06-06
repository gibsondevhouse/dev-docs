**Textarea** — auto-growing multiline field that mirrors the chat composer (grows with content up to `maxHeight`, default 120px).

```jsx
<Textarea placeholder="Type a message…" maxHeight={120} />
```

`invalid` turns the border red. `mono` uses the monospace stack. Set `autoGrow={false}` for a fixed-height textarea. Enter-to-send is the caller's responsibility (see the InputBar in the Plan Builder UI kit).
