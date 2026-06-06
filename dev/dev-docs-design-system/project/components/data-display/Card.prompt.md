**Card** — the dev-docs surface: white, 1px border, 8px radius, usually no shadow.

```jsx
<Card title="Plan 002 — Chat and RAG" description="Development · Active">
  Streaming chat + RAG indexing over a local repo.
</Card>
<Card pad hover>Quiet bordered tile</Card>
```

`shadow` floats it (popover/dialog), `hover` adds an interactive border/shadow, `pad` adds padding when there's no header. Borders — not shadows — are the default separator.
