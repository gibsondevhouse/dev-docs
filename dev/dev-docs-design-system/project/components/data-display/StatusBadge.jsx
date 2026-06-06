import React from "react";

const STYLE_ID = "dd-status-styles";
function useStatusStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.dd-status {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--font-sans); font-size: var(--text-xs);
  font-weight: var(--weight-medium); line-height: 1;
  padding: 5px 11px; border-radius: var(--radius-full); white-space: nowrap;
}
.dd-status__dot { width: 7px; height: 7px; border-radius: 50%; }
.dd-type {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-weight: var(--weight-bold);
  color: #fff; border-radius: var(--radius-sm);
}
`;
    document.head.appendChild(el);
  }, []);
}

const STATUS = {
  queued:   { label: "Queued",   bg: "var(--status-queued-soft)",   fg: "#3f4a5a", dot: "var(--status-queued)" },
  active:   { label: "Active",   bg: "var(--status-active-soft)",   fg: "#1d4ed8", dot: "var(--status-active)" },
  complete: { label: "Complete", bg: "var(--status-complete-soft)", fg: "#15803d", dot: "var(--status-complete)" },
  deferred: { label: "Deferred", bg: "var(--status-deferred-soft)", fg: "#92400e", dot: "var(--status-deferred)" },
  blocked:  { label: "Blocked",  bg: "var(--status-blocked-soft)",  fg: "#b91c1c", dot: "var(--status-blocked)" },
};

/**
 * StatusBadge — the methodology's plan-status pill. One of
 * queued · active · complete · deferred · blocked.
 */
export function StatusBadge({ status = "queued", children, className = "", ...rest }) {
  useStatusStyles();
  const s = STATUS[status] || STATUS.queued;
  return (
    <span
      className={["dd-status", className].filter(Boolean).join(" ")}
      style={{ background: s.bg, color: s.fg }}
      {...rest}
    >
      <span className="dd-status__dot" style={{ background: s.dot }} />
      {children || s.label}
    </span>
  );
}

const TYPE = {
  d: { color: "var(--type-d)", label: "d" },
  p: { color: "var(--type-p)", label: "p" },
  r: { color: "var(--type-r)", label: "r" },
};
const TYPE_SIZE = { sm: 18, md: 24, lg: 30 };

/**
 * PlanTypeTag — the d/p/r plan-type square (development / polishing /
 * refactoring), matching plan-folder prefixes.
 */
export function PlanTypeTag({ type = "d", size = "md", className = "", ...rest }) {
  useStatusStyles();
  const t = TYPE[type] || TYPE.d;
  const px = TYPE_SIZE[size] || TYPE_SIZE.md;
  return (
    <span
      className={["dd-type", className].filter(Boolean).join(" ")}
      style={{
        background: t.color,
        width: px,
        height: px,
        fontSize: Math.round(px * 0.55),
      }}
      {...rest}
    >
      {t.label}
    </span>
  );
}
