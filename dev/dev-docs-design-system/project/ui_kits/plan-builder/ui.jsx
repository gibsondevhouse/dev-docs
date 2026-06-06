/* dev-docs Plan Builder — UI primitives (token-driven, self-contained).
   Shares components across babel files via window assignment. */

(() => {
/* ---- Icon: inline Lucide paths, inherits `color` via stroke ---- */
const ICONS = {
  "message-square": ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  "folder-open": ["M6 14l1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"],
  "folder": ["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"],
  "settings": ["M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  "send": ["M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z", "M21.854 2.147 10.914 13.087"],
  "file-text": ["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z", "M14 2v4a2 2 0 0 0 2 2h4", "M10 9H8", "M16 13H8", "M16 17H8"],
  "download": ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
  "arrow-up": ["M12 19V5", "M5 12l7-7 7 7"],
  "user": ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  "copy": ["M10 8h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z", "M6 16a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2"],
  "rotate-cw": ["M21 12a9 9 0 1 1-3-6.7L21 8", "M21 3v5h-5"],
  "x": ["M18 6 6 18", "M6 6l12 12"],
  "plus": ["M5 12h14", "M12 5v14"],
  "chevron-down": ["M6 9l6 6 6-6"],
  "sliders": ["M4 21v-7", "M4 10V3", "M12 21v-9", "M12 8V3", "M20 21v-5", "M20 12V3", "M1 14h6", "M9 8h6", "M17 16h6"],
};
function Icon({ name, size = 20, style }) {
  const paths = ICONS[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ display: "block", flexShrink: 0, ...style }}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* ---- Button ---- */
function Button({ variant = "primary", size = "md", block, disabled, loading, startIcon, children, ...rest }) {
  const cls = ["dd-btn", `dd-btn--${variant}`, `dd-btn--${size}`, block ? "dd-btn--block" : ""].filter(Boolean).join(" ");
  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading ? <span className="dd-spin" /> : startIcon}
      {children}
    </button>
  );
}

/* ---- IconButton ---- */
function IconButton({ variant = "default", active, label, children, ...rest }) {
  const cls = ["dd-iconbtn", `dd-iconbtn--${variant}`, active ? "is-active" : ""].filter(Boolean).join(" ");
  return (
    <button className={cls} aria-label={label} aria-pressed={active || undefined} {...rest}>
      {children}
    </button>
  );
}

/* ---- Field / Input / Select / Textarea ---- */
function Field({ label, hint, error, htmlFor, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {label && <label className="dd-field-label" htmlFor={htmlFor}>{label}</label>}
      {children}
      {(error || hint) && <span className={"dd-field-hint" + (error ? " dd-field-hint--error" : "")}>{error || hint}</span>}
    </div>
  );
}
function Input({ invalid, mono, className = "", ...rest }) {
  return <input className={["dd-field", invalid ? "dd-field--invalid" : "", mono ? "dd-field--mono" : "", className].filter(Boolean).join(" ")} {...rest} />;
}
function Select({ invalid, className = "", children, ...rest }) {
  return (
    <span className="dd-select-wrap">
      <select className={["dd-field", invalid ? "dd-field--invalid" : "", className].filter(Boolean).join(" ")} {...rest}>{children}</select>
    </span>
  );
}
const Textarea = React.forwardRef(function Textarea({ invalid, mono, maxHeight = 120, autoGrow = true, className = "", onInput, ...rest }, ref) {
  function handle(e) {
    if (autoGrow) { const el = e.currentTarget; el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, maxHeight) + "px"; }
    onInput && onInput(e);
  }
  return <textarea ref={ref} className={["dd-field", invalid ? "dd-field--invalid" : "", mono ? "dd-field--mono" : "", className].filter(Boolean).join(" ")} rows={1} style={{ maxHeight }} onInput={handle} {...rest} />;
});

/* ---- Card ---- */
function Card({ title, description, pad, hover, className = "", children, ...rest }) {
  const cls = ["dd-card", hover ? "dd-card--hover" : "", pad ? "dd-card--pad" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      {(title || description) && (
        <div className="dd-card-head">
          {title && <p className="dd-card-title">{title}</p>}
          {description && <p className="dd-card-desc">{description}</p>}
        </div>
      )}
      {children && (title || description ? <div className="dd-card-body">{children}</div> : pad ? children : <div className="dd-card-body">{children}</div>)}
    </div>
  );
}

/* ---- Badge ---- */
function Badge({ variant = "secondary", mono, dot, className = "", children, ...rest }) {
  return (
    <span className={["dd-badge", `dd-badge--${variant}`, mono ? "dd-badge--mono" : "", className].filter(Boolean).join(" ")} {...rest}>
      {dot && <span className="dd-badge__dot" />}{children}
    </span>
  );
}

/* ---- StatusBadge / PlanTypeTag ---- */
const STATUS = {
  queued: { label: "Queued", bg: "var(--status-queued-soft)", fg: "#3f4a5a", dot: "var(--status-queued)" },
  active: { label: "Active", bg: "var(--status-active-soft)", fg: "#1d4ed8", dot: "var(--status-active)" },
  complete: { label: "Complete", bg: "var(--status-complete-soft)", fg: "#15803d", dot: "var(--status-complete)" },
  deferred: { label: "Deferred", bg: "var(--status-deferred-soft)", fg: "#92400e", dot: "var(--status-deferred)" },
  blocked: { label: "Blocked", bg: "var(--status-blocked-soft)", fg: "#b91c1c", dot: "var(--status-blocked)" },
};
function StatusBadge({ status = "queued", children }) {
  const s = STATUS[status] || STATUS.queued;
  return <span className="dd-status" style={{ background: s.bg, color: s.fg }}><span className="dd-status__dot" style={{ background: s.dot }} />{children || s.label}</span>;
}
const TYPE = { d: "var(--type-d)", p: "var(--type-p)", r: "var(--type-r)" };
function PlanTypeTag({ type = "d", size = 24 }) {
  return <span className="dd-type" style={{ background: TYPE[type], width: size, height: size, fontSize: Math.round(size * 0.55) }}>{type}</span>;
}

Object.assign(window, { Icon, Button, IconButton, Field, Input, Select, Textarea, Card, Badge, StatusBadge, PlanTypeTag });
})();
