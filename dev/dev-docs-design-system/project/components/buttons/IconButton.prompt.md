**IconButton** — a 40×40 square icon-only target; use for the sidebar rail nav and the composer Send button. Always pass `label` for accessibility.

```jsx
<IconButton variant="rail" active label="Chat"><MessageSquare /></IconButton>
<IconButton variant="primary" label="Send"><Send /></IconButton>
<IconButton label="Settings"><Settings /></IconButton>
```

Variants: `default` (light content, accent hover), `primary` (filled near-black, composer Send), `rail` (dark sidebar, white/10 hover, white when active). `active` sets the selected state. Icons render at 20px and inherit `currentColor`.
