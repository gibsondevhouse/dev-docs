**Button** — the primary dev-docs action control; dark and quiet by default, used for Save / Index Folder / Send-style actions.

```jsx
<Button variant="primary" onClick={save}>Index Folder</Button>
<Button variant="secondary">Browse</Button>
<Button variant="ghost" size="sm">Clear</Button>
<Button loading>Indexing…</Button>
```

Variants: `primary` (near-black slate, default), `secondary` (bordered, light), `ghost` (text-only), `destructive` (red). Sizes: `sm` 32px · `md` 40px (default) · `lg` 44px. Props: `block` (full width), `loading` (spinner + disabled), `startIcon` (leading node), plus all native `<button>` attrs. Hover = subtle fill/darken; focus = 2px ring; never scales.
