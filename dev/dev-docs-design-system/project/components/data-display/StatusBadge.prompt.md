**StatusBadge / PlanTypeTag** — the methodology's visual language. StatusBadge is the plan-status pill; PlanTypeTag is the d/p/r square.

```jsx
<StatusBadge status="active" />
<StatusBadge status="complete" />
<StatusBadge status="blocked">Blocked · API key</StatusBadge>

<PlanTypeTag type="d" />   {/* development */}
<PlanTypeTag type="p" />   {/* polishing */}
<PlanTypeTag type="r" size="lg" /> {/* refactoring */}
```

StatusBadge `status`: queued · active · complete · deferred · blocked (each a soft-tinted pill + dot). PlanTypeTag `type`: d/p/r, `size`: sm/md/lg. Use these wherever you reference plans — they ARE the dev-docs brand.
