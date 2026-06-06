import React from "react";

const STYLE_ID = "dd-badge-styles";
function useBadgeStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.dd-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-sans); font-size: var(--text-xs);
  font-weight: var(--weight-medium); line-height: 1;
  padding: 4px 9px; border-radius: var(--radius-full);
  border: 1px solid transparent; white-space: nowrap;
}
.dd-badge--mono { font-family: var(--font-mono); letter-spacing: var(--tracking-mono); }
.dd-badge--default { background: var(--primary); color: var(--primary-foreground); }
.dd-badge--secondary { background: var(--secondary); color: var(--secondary-foreground); }
.dd-badge--outline { background: transparent; color: var(--foreground); border-color: var(--border); }
.dd-badge--muted { background: var(--secondary); color: var(--muted-foreground); }
.dd-badge--success { background: var(--status-complete-soft); color: #15803d; }
.dd-badge--destructive { background: var(--status-blocked-soft); color: #b91c1c; }
.dd-badge__dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
`;
    document.head.appendChild(el);
  }, []);
}

/**
 * Badge — small label/count pill. For plan status, prefer StatusBadge.
 */
export function Badge({
  variant = "secondary",
  mono = false,
  dot = false,
  className = "",
  children,
  ...rest
}) {
  useBadgeStyles();
  const cls = [
    "dd-badge",
    `dd-badge--${variant}`,
    mono ? "dd-badge--mono" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      {dot && <span className="dd-badge__dot" />}
      {children}
    </span>
  );
}
