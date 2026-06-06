/* @ds-bundle: {"format":3,"namespace":"DevDocsDesignSystem_300643","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"StatusBadge","sourcePath":"components/data-display/StatusBadge.jsx"},{"name":"PlanTypeTag","sourcePath":"components/data-display/StatusBadge.jsx"},{"name":"Field","sourcePath":"components/forms/Input.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"cf0da107b965","components/buttons/IconButton.jsx":"a4d0a3977482","components/data-display/Badge.jsx":"a4d257ef7013","components/data-display/Card.jsx":"68247400bc90","components/data-display/StatusBadge.jsx":"5383eb4fb9d1","components/forms/Input.jsx":"28513bdf5065","components/forms/Select.jsx":"45dd70ea5d04","components/forms/Textarea.jsx":"08d109f45396","ui_kits/plan-builder/screens.jsx":"80634152351c","ui_kits/plan-builder/ui.jsx":"fa197bf5aca3"},"inlinedExternals":[],"unexposedExports":[{"name":"useFieldStyles","sourcePath":"components/forms/Input.jsx"}]} */

(() => {

const __ds_ns = (window.DevDocsDesignSystem_300643 = window.DevDocsDesignSystem_300643 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject the button stylesheet once. Uses design-system tokens so it
   stays in sync with styles.css. */
const STYLE_ID = "dd-button-styles";
function useButtonStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.dd-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-sans); font-weight: var(--weight-medium);
  font-size: var(--text-sm); line-height: 1; white-space: nowrap;
  border-radius: var(--radius-md); border: 1px solid transparent;
  cursor: pointer; user-select: none;
  transition: background-color var(--duration-base) var(--ease-standard),
              color var(--duration-base) var(--ease-standard),
              border-color var(--duration-base) var(--ease-standard);
}
.dd-btn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
.dd-btn:disabled { opacity: 0.5; pointer-events: none; }
.dd-btn svg { width: 1em; height: 1em; }

/* sizes */
.dd-btn--sm { height: 2rem; padding: 0 0.75rem; font-size: var(--text-xs); }
.dd-btn--md { height: 2.5rem; padding: 0 1rem; }
.dd-btn--lg { height: 2.75rem; padding: 0 1.25rem; font-size: var(--text-base); }

/* variants */
.dd-btn--primary { background: var(--primary); color: var(--primary-foreground); }
.dd-btn--primary:hover { background: #1c2740; }
.dd-btn--secondary { background: var(--background); color: var(--foreground); border-color: var(--input); }
.dd-btn--secondary:hover { background: var(--accent); color: var(--accent-foreground); }
.dd-btn--ghost { background: transparent; color: var(--foreground); }
.dd-btn--ghost:hover { background: var(--accent); color: var(--accent-foreground); }
.dd-btn--destructive { background: var(--destructive); color: var(--destructive-foreground); }
.dd-btn--destructive:hover { background: #dc2626; }
.dd-btn--block { width: 100%; }
`;
    document.head.appendChild(el);
  }, []);
}

/**
 * Button — the primary dev-docs action control. Dark/quiet by default;
 * matches the app's h-10 rounded-md text-sm medium buttons.
 */
function Button({
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  loading = false,
  startIcon = null,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  useButtonStyles();
  const cls = ["dd-btn", `dd-btn--${variant}`, `dd-btn--${size}`, block ? "dd-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    type: type,
    disabled: disabled || loading
  }, rest), loading ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: "1em",
      height: "1em",
      border: "2px solid currentColor",
      borderTopColor: "transparent",
      borderRadius: "50%",
      display: "inline-block",
      animation: "dd-spin 0.7s linear infinite"
    }
  }) : startIcon, children, /*#__PURE__*/React.createElement("style", null, "@keyframes dd-spin{to{transform:rotate(360deg)}}"));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "dd-iconbutton-styles";
function useIconButtonStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.dd-iconbtn {
  display: inline-flex; align-items: center; justify-content: center;
  height: 2.5rem; width: 2.5rem; flex-shrink: 0;
  border-radius: var(--radius-md); border: 1px solid transparent;
  background: transparent; color: var(--muted-foreground);
  cursor: pointer;
  transition: background-color var(--duration-base) var(--ease-standard),
              color var(--duration-base) var(--ease-standard);
}
.dd-iconbtn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
.dd-iconbtn:disabled { opacity: 0.5; pointer-events: none; }
.dd-iconbtn svg, .dd-iconbtn img { width: 1.25rem; height: 1.25rem; }

/* default (light content) */
.dd-iconbtn--default { color: var(--muted-foreground); }
.dd-iconbtn--default:hover { background: var(--accent); color: var(--accent-foreground); }
.dd-iconbtn--default.is-active { background: var(--accent); color: var(--foreground); }

/* primary filled (composer Send) */
.dd-iconbtn--primary { background: var(--primary); color: var(--primary-foreground); }
.dd-iconbtn--primary:hover { background: #1c2740; }

/* rail (dark sidebar) */
.dd-iconbtn--rail { color: var(--rail-icon); }
.dd-iconbtn--rail:hover { background: rgba(255,255,255,0.1); color: #fff; }
.dd-iconbtn--rail.is-active { background: rgba(241,245,249,0.16); color: #fff; }
.dd-iconbtn--rail:focus-visible { box-shadow: 0 0 0 2px var(--rail-bg), 0 0 0 4px rgba(255,255,255,0.6); }
`;
    document.head.appendChild(el);
  }, []);
}

/**
 * IconButton — a 40×40 square icon target. Three grounds:
 * default (light content), primary (filled, e.g. composer Send),
 * rail (dark sidebar with white/10 hover).
 */
function IconButton({
  variant = "default",
  active = false,
  label,
  disabled = false,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  useIconButtonStyles();
  const cls = ["dd-iconbtn", `dd-iconbtn--${variant}`, active ? "is-active" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    type: type,
    disabled: disabled,
    "aria-label": label,
    "aria-pressed": active || undefined
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Badge({
  variant = "secondary",
  mono = false,
  dot = false,
  className = "",
  children,
  ...rest
}) {
  useBadgeStyles();
  const cls = ["dd-badge", `dd-badge--${variant}`, mono ? "dd-badge--mono" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "dd-badge__dot"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "dd-card-styles";
function useCardStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.dd-card {
  background: var(--card); color: var(--card-foreground);
  border: 1px solid var(--border); border-radius: var(--radius);
}
.dd-card--shadow { border-color: transparent; box-shadow: var(--shadow-md); }
.dd-card--pad { padding: var(--space-4); }
.dd-card--hover { transition: border-color var(--duration-base) var(--ease-standard),
                  box-shadow var(--duration-base) var(--ease-standard); cursor: pointer; }
.dd-card--hover:hover { border-color: var(--slate-300); box-shadow: var(--shadow-sm); }
.dd-card-head { padding: var(--space-4) var(--space-4) 0; }
.dd-card-title { font-size: var(--text-sm); font-weight: var(--weight-semibold); margin: 0; }
.dd-card-desc { font-size: var(--text-xs); color: var(--muted-foreground); margin: 4px 0 0; }
.dd-card-body { padding: var(--space-4); }
`;
    document.head.appendChild(el);
  }, []);
}

/**
 * Card — the dev-docs surface: white, 1px border, 8px radius, usually
 * no shadow. Use header (title/description) + body, or just `pad`.
 */
function Card({
  title,
  description,
  shadow = false,
  hover = false,
  pad = false,
  className = "",
  children,
  ...rest
}) {
  useCardStyles();
  const cls = ["dd-card", shadow ? "dd-card--shadow" : "", hover ? "dd-card--hover" : "", pad ? "dd-card--pad" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), (title || description) && /*#__PURE__*/React.createElement("div", {
    className: "dd-card-head"
  }, title && /*#__PURE__*/React.createElement("p", {
    className: "dd-card-title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "dd-card-desc"
  }, description)), (title || description) && children ? /*#__PURE__*/React.createElement("div", {
    className: "dd-card-body"
  }, children) : pad ? children : children && /*#__PURE__*/React.createElement("div", {
    className: "dd-card-body"
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  queued: {
    label: "Queued",
    bg: "var(--status-queued-soft)",
    fg: "#3f4a5a",
    dot: "var(--status-queued)"
  },
  active: {
    label: "Active",
    bg: "var(--status-active-soft)",
    fg: "#1d4ed8",
    dot: "var(--status-active)"
  },
  complete: {
    label: "Complete",
    bg: "var(--status-complete-soft)",
    fg: "#15803d",
    dot: "var(--status-complete)"
  },
  deferred: {
    label: "Deferred",
    bg: "var(--status-deferred-soft)",
    fg: "#92400e",
    dot: "var(--status-deferred)"
  },
  blocked: {
    label: "Blocked",
    bg: "var(--status-blocked-soft)",
    fg: "#b91c1c",
    dot: "var(--status-blocked)"
  }
};

/**
 * StatusBadge — the methodology's plan-status pill. One of
 * queued · active · complete · deferred · blocked.
 */
function StatusBadge({
  status = "queued",
  children,
  className = "",
  ...rest
}) {
  useStatusStyles();
  const s = STATUS[status] || STATUS.queued;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["dd-status", className].filter(Boolean).join(" "),
    style: {
      background: s.bg,
      color: s.fg
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "dd-status__dot",
    style: {
      background: s.dot
    }
  }), children || s.label);
}
const TYPE = {
  d: {
    color: "var(--type-d)",
    label: "d"
  },
  p: {
    color: "var(--type-p)",
    label: "p"
  },
  r: {
    color: "var(--type-r)",
    label: "r"
  }
};
const TYPE_SIZE = {
  sm: 18,
  md: 24,
  lg: 30
};

/**
 * PlanTypeTag — the d/p/r plan-type square (development / polishing /
 * refactoring), matching plan-folder prefixes.
 */
function PlanTypeTag({
  type = "d",
  size = "md",
  className = "",
  ...rest
}) {
  useStatusStyles();
  const t = TYPE[type] || TYPE.d;
  const px = TYPE_SIZE[size] || TYPE_SIZE.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["dd-type", className].filter(Boolean).join(" "),
    style: {
      background: t.color,
      width: px,
      height: px,
      fontSize: Math.round(px * 0.55)
    }
  }, rest), t.label);
}
Object.assign(__ds_scope, { StatusBadge, PlanTypeTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "dd-field-styles";
function useFieldStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.dd-field {
  height: 2.5rem; width: 100%;
  border-radius: var(--radius-md); border: 1px solid var(--input);
  background: var(--background); color: var(--foreground);
  font-family: var(--font-sans); font-size: var(--text-sm);
  padding: 0 0.75rem;
  transition: box-shadow var(--duration-base) var(--ease-standard),
              border-color var(--duration-base) var(--ease-standard);
}
.dd-field::placeholder { color: var(--muted-foreground); }
.dd-field:focus-visible, .dd-field:focus {
  outline: none; box-shadow: var(--shadow-focus);
}
.dd-field:disabled { opacity: 0.5; cursor: not-allowed; }
.dd-field--invalid { border-color: var(--destructive); }
.dd-field--mono { font-family: var(--font-mono); }
textarea.dd-field {
  height: auto; min-height: 2.5rem; padding: 0.5rem 0.75rem;
  resize: vertical; line-height: var(--leading-normal);
}
.dd-field-label {
  display: block; font-family: var(--font-sans); font-size: var(--text-sm);
  font-weight: var(--weight-medium); color: var(--foreground);
  margin-bottom: 0.5rem;
}
.dd-field-hint { font-size: var(--text-xs); color: var(--muted-foreground); margin-top: 0.375rem; }
.dd-field-hint--error { color: var(--destructive); }
.dd-select-wrap { position: relative; width: 100%; }
.dd-select-wrap select { appearance: none; padding-right: 2rem; cursor: pointer; }
.dd-select-wrap::after {
  content: ""; position: absolute; right: 0.75rem; top: 50%; pointer-events: none;
  width: 0.5rem; height: 0.5rem; margin-top: -0.35rem;
  border-right: 1.5px solid var(--muted-foreground);
  border-bottom: 1.5px solid var(--muted-foreground);
  transform: rotate(45deg);
}
`;
    document.head.appendChild(el);
  }, []);
}

/**
 * Field — optional label + hint/error wrapper around any control.
 */
function Field({
  label,
  hint,
  error,
  htmlFor,
  children
}) {
  useFieldStyles();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "dd-field-label",
    htmlFor: htmlFor
  }, label), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    className: "dd-field-hint" + (error ? " dd-field-hint--error" : "")
  }, error || hint));
}

/**
 * Input — single-line text field. Matches the app's h-10 bordered input.
 */
function Input({
  invalid = false,
  mono = false,
  className = "",
  ...rest
}) {
  useFieldStyles();
  const cls = ["dd-field", invalid ? "dd-field--invalid" : "", mono ? "dd-field--mono" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("input", _extends({
    className: cls
  }, rest));
}
Object.assign(__ds_scope, { useFieldStyles, Field, Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — native select styled to match the dev-docs field, with a
 * custom chevron. Used for the model picker in Settings.
 */
function Select({
  invalid = false,
  className = "",
  children,
  ...rest
}) {
  __ds_scope.useFieldStyles();
  const cls = ["dd-field", invalid ? "dd-field--invalid" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", {
    className: "dd-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    className: cls
  }, rest), children));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Textarea — auto-growing multiline field. Mirrors the chat composer
 * (min 40px, grows to a max, Enter-to-send handled by the caller).
 */
const Textarea = React.forwardRef(function Textarea({
  invalid = false,
  mono = false,
  maxHeight = 120,
  autoGrow = true,
  className = "",
  onInput,
  ...rest
}, ref) {
  __ds_scope.useFieldStyles();
  const cls = ["dd-field", invalid ? "dd-field--invalid" : "", mono ? "dd-field--mono" : "", className].filter(Boolean).join(" ");
  function handleInput(e) {
    if (autoGrow) {
      const el = e.currentTarget;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    }
    onInput && onInput(e);
  }
  return /*#__PURE__*/React.createElement("textarea", _extends({
    ref: ref,
    className: cls,
    rows: 1,
    style: {
      maxHeight: `${maxHeight}px`
    },
    onInput: handleInput
  }, rest));
});
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plan-builder/screens.jsx
try { (() => {
/* dev-docs Plan Builder — screens & shell. Reads primitives from window. */

(() => {
  const {
    useState,
    useRef,
    useEffect
  } = React;
  const {
    Icon,
    Button,
    IconButton,
    Field,
    Input,
    Select,
    Textarea,
    Card,
    Badge,
    StatusBadge,
    PlanTypeTag
  } = window;

  /* ============================ Sidebar rail ============================ */
  function Rail({
    route,
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("aside", {
      className: "rail"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rail__wordmark"
    }, "dev", /*#__PURE__*/React.createElement("br", null), "docs"), /*#__PURE__*/React.createElement("nav", {
      className: "rail__nav"
    }, /*#__PURE__*/React.createElement(IconButton, {
      variant: "rail",
      active: route === "chat",
      label: "Chat",
      onClick: () => onNavigate("chat")
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "message-square"
    })), /*#__PURE__*/React.createElement(IconButton, {
      variant: "rail",
      active: route === "repos",
      label: "Repos",
      onClick: () => onNavigate("repos")
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "folder-open"
    })), /*#__PURE__*/React.createElement("div", {
      className: "rail__spacer"
    }), /*#__PURE__*/React.createElement(IconButton, {
      variant: "rail",
      active: route === "settings",
      label: "Settings",
      onClick: () => onNavigate("settings")
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings"
    }))));
  }

  /* ============================ Chat screen ============================ */
  // A canned plan the assistant "generates" from a plain-English request.
  const PLAN = {
    id: "d-004-plan-export",
    name: "Plan Export to Disk",
    type: "d",
    summary: "Lets the user export the in-progress plan as a ready-to-run folder, then updates the plan registries.",
    reply: "Got it. I read your codebase and found the existing `planStore` and the export endpoint stub. Here's a structured plan in the dev-docs format:\n\n**Plan d-004 — Plan Export to Disk**\nTransforms the live preview into an exportable plan folder. Stage 1 wires a Python `/export` endpoint that writes the `PlanNode` tree to disk in the template structure. Stage 2 adds an export confirmation modal. Stage 3 updates `master-plan.md` and `active-plan.md` automatically.\n\nThe plan is in the preview panel — review the tree, then Export.",
    files: [{
      path: "004.md",
      depth: 0,
      kind: "file",
      title: "Plan d-004 — Plan Export to Disk",
      body: "# Plan 004 — Plan Export to Disk\n\n## What This Plan Does\nLets the user export the in-progress plan as a ready-to-execute folder on disk, in the exact dev-docs template structure, then updates the plan registries.\n\n## Definition of Done\n- [ ] Export writes the full plan folder to the chosen directory\n- [ ] Folder follows the stages → phases → parts structure\n- [ ] master-plan.md and active-plan.md are updated after export"
    }, {
      path: "004-context/",
      depth: 0,
      kind: "dir"
    }, {
      path: "004-context.md",
      depth: 1,
      kind: "file",
      title: "Context",
      body: "# 004 — Codebase Context\n\nKey files inherited from d-003:\n- `src/store/planStore.ts` — the PlanNode tree\n- `src-python/export.py` — endpoint stub (incomplete)\n\nConstraint: write only inside the user-chosen output directory."
    }, {
      path: "004-workflow/",
      depth: 0,
      kind: "dir"
    }, {
      path: "004-st1/",
      depth: 1,
      kind: "dir"
    }, {
      path: "st1-export-endpoint.md",
      depth: 2,
      kind: "file",
      title: "Stage 1 — Export endpoint",
      body: "# Stage 1 — Export Endpoint\n\n**Part 1** — Python `/export` route that serializes the PlanNode tree.\n**Part 2** — Write files in template order (stages → phases → parts).\n**Part 3** — Return the written path to the frontend."
    }, {
      path: "004-st2/",
      depth: 1,
      kind: "dir"
    }, {
      path: "st2-confirm-modal.md",
      depth: 2,
      kind: "file",
      title: "Stage 2 — Confirm modal",
      body: "# Stage 2 — Export Confirmation\n\nA modal previews the destination path and file count before writing. Confirm triggers the endpoint; cancel is a no-op."
    }, {
      path: "004-st3/",
      depth: 1,
      kind: "dir"
    }, {
      path: "st3-registry-update.md",
      depth: 2,
      kind: "file",
      title: "Stage 3 — Registry update",
      body: "# Stage 3 — Registry Update\n\nAfter a successful export, append the new plan to `master-plan.md` and set it active in `active-plan.md`."
    }]
  };
  function renderMarkdownLite(md) {
    // tiny markdown: # / ## headings, **bold**, `code`, - lists
    const lines = md.split("\n");
    const out = [];
    let list = null;
    const inline = t => {
      const parts = [];
      let rest = t,
        key = 0;
      const re = /(\*\*[^*]+\*\*|`[^`]+`)/;
      let m;
      while (m = rest.match(re)) {
        if (m.index > 0) parts.push(rest.slice(0, m.index));
        const tok = m[0];
        if (tok.startsWith("**")) parts.push(/*#__PURE__*/React.createElement("strong", {
          key: key++
        }, tok.slice(2, -2)));else parts.push(/*#__PURE__*/React.createElement("code", {
          key: key++
        }, tok.slice(1, -1)));
        rest = rest.slice(m.index + tok.length);
      }
      parts.push(rest);
      return parts;
    };
    lines.forEach((ln, i) => {
      if (/^- /.test(ln) || /^- \[/.test(ln)) {
        list = list || [];
        list.push(/*#__PURE__*/React.createElement("li", {
          key: i
        }, inline(ln.replace(/^- (\[.\] )?/, ""))));
        return;
      }
      if (list) {
        out.push(/*#__PURE__*/React.createElement("ul", {
          key: "u" + i
        }, list));
        list = null;
      }
      if (/^# /.test(ln)) out.push(/*#__PURE__*/React.createElement("h3", {
        key: i,
        style: {
          fontSize: "var(--text-base)"
        }
      }, inline(ln.slice(2))));else if (/^## /.test(ln)) out.push(/*#__PURE__*/React.createElement("h3", {
        key: i
      }, inline(ln.slice(3))));else if (ln.trim() === "") out.push(/*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          height: 6
        }
      }));else out.push(/*#__PURE__*/React.createElement("p", {
        key: i
      }, inline(ln)));
    });
    if (list) out.push(/*#__PURE__*/React.createElement("ul", {
      key: "uend"
    }, list));
    return out;
  }
  const STARTER_PROMPTS = ["Add a way to export the plan to disk", "Plan a settings screen redesign", "Refactor the chat store"];
  const FILE_COUNT = PLAN.files.filter(f => f.kind === "file").length;
  function ArtifactPanel({
    onClose,
    openFile,
    setOpenFile
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "artpanel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "artpanel__head"
    }, /*#__PURE__*/React.createElement(PlanTypeTag, {
      type: PLAN.type,
      size: 22
    }), /*#__PURE__*/React.createElement("span", {
      className: "artpanel__title"
    }, PLAN.id), /*#__PURE__*/React.createElement(StatusBadge, {
      status: "queued"
    }), /*#__PURE__*/React.createElement(IconButton, {
      variant: "default",
      label: "Close plan",
      onClick: onClose
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 18
    }))), /*#__PURE__*/React.createElement("div", {
      className: "artpanel__body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tree",
      style: {
        marginBottom: 14
      }
    }, PLAN.files.map((f, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "tree__row " + (f.kind === "file" ? "is-file " : "") + (openFile && openFile.path === f.path && f.kind === "file" ? "is-active" : ""),
      style: {
        paddingLeft: 6 + f.depth * 14
      },
      onClick: () => f.kind === "file" && setOpenFile(f)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: f.kind === "dir" ? "folder" : "file-text",
      size: 14,
      style: {
        color: f.kind === "dir" ? "var(--slate-400)" : "var(--status-active)"
      }
    }), /*#__PURE__*/React.createElement("span", null, f.path)))), openFile && /*#__PURE__*/React.createElement(Card, {
      pad: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "md md--sm"
    }, renderMarkdownLite(openFile.body))), /*#__PURE__*/React.createElement(Button, {
      block: true,
      style: {
        marginTop: 14
      },
      startIcon: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 16,
        style: {
          color: "#fff"
        }
      })
    }, "Export plan to disk")));
  }
  function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [planReady, setPlanReady] = useState(false);
    const [panelOpen, setPanelOpen] = useState(false);
    const [openFile, setOpenFile] = useState(null);
    const scrollRef = useRef(null);
    const taRef = useRef(null);
    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);
    function autoGrow() {
      const el = taRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 200) + "px";
    }
    function send(preset) {
      const text = (preset != null ? preset : value).trim();
      if (!text || streaming) return;
      setValue("");
      if (taRef.current) taRef.current.style.height = "auto";
      setMessages(m => [...m, {
        role: "user",
        content: text
      }, {
        role: "assistant",
        content: ""
      }]);
      setStreaming(true);
      setPlanReady(false);
      setPanelOpen(false);
      const tokens = PLAN.reply.match(/\S+\s*/g) || [];
      let i = 0;
      const timer = setInterval(() => {
        i++;
        const partial = tokens.slice(0, i).join("");
        setMessages(m => {
          const c = m.slice();
          c[c.length - 1] = {
            role: "assistant",
            content: partial
          };
          return c;
        });
        if (i >= tokens.length) {
          clearInterval(timer);
          setStreaming(false);
          setPlanReady(true);
          setOpenFile(PLAN.files.find(f => f.kind === "file"));
        }
      }, 34);
    }
    function onKey(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    }
    function newChat() {
      setMessages([]);
      setValue("");
      setStreaming(false);
      setPlanReady(false);
      setPanelOpen(false);
      setOpenFile(null);
    }
    const hasMessages = messages.length > 0;
    const composer = /*#__PURE__*/React.createElement("div", {
      className: "composer2"
    }, /*#__PURE__*/React.createElement("textarea", {
      ref: taRef,
      className: "composer2__ta",
      rows: 1,
      value: value,
      disabled: streaming,
      placeholder: "Describe what you want to build\u2026",
      onChange: e => {
        setValue(e.target.value);
        autoGrow();
      },
      onKeyDown: onKey
    }), /*#__PURE__*/React.createElement("div", {
      className: "composer2__bar"
    }, /*#__PURE__*/React.createElement("button", {
      className: "composer2__chip",
      type: "button"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sliders",
      size: 13
    }), " deepseek-chat ", /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 13
    })), /*#__PURE__*/React.createElement("span", {
      className: "composer2__spacer"
    }), /*#__PURE__*/React.createElement("button", {
      className: "composer2__send",
      "aria-label": "Send",
      disabled: streaming || !value.trim(),
      onClick: () => send()
    }, streaming ? /*#__PURE__*/React.createElement("span", {
      className: "dd-spin",
      style: {
        color: "#fff",
        width: 14,
        height: 14
      }
    }) : /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up",
      size: 18
    }))));
    return /*#__PURE__*/React.createElement("div", {
      className: "chat2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "topbar__title"
    }, planReady ? /*#__PURE__*/React.createElement(Badge, {
      variant: "secondary",
      mono: true
    }, PLAN.id) : "New plan"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, planReady && !panelOpen && /*#__PURE__*/React.createElement("button", {
      className: "linkbtn",
      onClick: () => setPanelOpen(true)
    }, "Show plan"), hasMessages && /*#__PURE__*/React.createElement(IconButton, {
      variant: "default",
      label: "New chat",
      onClick: newChat
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 18
    })))), !hasMessages ? /*#__PURE__*/React.createElement("div", {
      className: "chat2__hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero__greeting"
    }, "What are you building?"), /*#__PURE__*/React.createElement("div", {
      className: "hero__sub"
    }, "Describe it in plain English \u2014 dev-docs reads your repo and writes the plan."), /*#__PURE__*/React.createElement("div", {
      className: "hero__composer"
    }, composer), /*#__PURE__*/React.createElement("div", {
      className: "hero__prompts"
    }, STARTER_PROMPTS.map(p => /*#__PURE__*/React.createElement("button", {
      key: p,
      className: "prompt-chip",
      onClick: () => send(p)
    }, p)))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "chat2__scroll",
      ref: scrollRef
    }, /*#__PURE__*/React.createElement("div", {
      className: "chat2__col"
    }, messages.map((m, idx) => {
      const isLast = idx === messages.length - 1;
      const isAssistant = m.role === "assistant";
      return /*#__PURE__*/React.createElement("div", {
        key: idx,
        className: "turn turn--" + m.role
      }, /*#__PURE__*/React.createElement("div", {
        className: "turn__avatar turn__avatar--" + (isAssistant ? "a" : "u")
      }, isAssistant ? "d" : /*#__PURE__*/React.createElement(Icon, {
        name: "user",
        size: 15
      })), /*#__PURE__*/React.createElement("div", {
        className: "turn__body"
      }, /*#__PURE__*/React.createElement("div", {
        className: "turn__name"
      }, isAssistant ? "dev-docs" : "You"), isAssistant ? /*#__PURE__*/React.createElement("div", {
        className: "md turn__text"
      }, renderMarkdownLite(m.content), streaming && isLast && /*#__PURE__*/React.createElement("span", {
        className: "caret"
      }), planReady && isLast && /*#__PURE__*/React.createElement("button", {
        className: "artifact" + (panelOpen ? " is-open" : ""),
        onClick: () => setPanelOpen(true)
      }, /*#__PURE__*/React.createElement("span", {
        className: "artifact__icon"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "file-text",
        size: 18
      })), /*#__PURE__*/React.createElement("span", {
        className: "artifact__meta"
      }, /*#__PURE__*/React.createElement("span", {
        className: "artifact__title"
      }, PLAN.id), /*#__PURE__*/React.createElement("span", {
        className: "artifact__sub"
      }, "Plan \xB7 ", FILE_COUNT, " files \xB7 stages \u2192 phases \u2192 parts")), /*#__PURE__*/React.createElement("span", {
        className: "artifact__open"
      }, "Open")), !streaming && /*#__PURE__*/React.createElement("div", {
        className: "turn__actions"
      }, /*#__PURE__*/React.createElement("button", {
        className: "iconaction",
        "aria-label": "Copy"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "copy",
        size: 15
      })), /*#__PURE__*/React.createElement("button", {
        className: "iconaction",
        "aria-label": "Retry"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "rotate-cw",
        size: 15
      })))) : /*#__PURE__*/React.createElement("div", {
        className: "md turn__text"
      }, m.content)));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "chat2__dock"
    }, composer, /*#__PURE__*/React.createElement("div", {
      className: "composer__hint"
    }, "dev-docs grounds every plan in your indexed repo. Plans are agent-ready."))), panelOpen && planReady && /*#__PURE__*/React.createElement(ArtifactPanel, {
      onClose: () => setPanelOpen(false),
      openFile: openFile,
      setOpenFile: setOpenFile
    }));
  }

  /* ============================ Repos screen ============================ */
  const INDEX_LINES = [{
    t: "$ indexing /Users/dev/plan-builder",
    c: "dim"
  }, {
    t: "→ scanning files… 142 found"
  }, {
    t: "→ chunking source (3,910 chunks)"
  }, {
    t: "→ embedding via DeepSeek"
  }, {
    t: "→ writing to ChromaDB"
  }, {
    t: "✓ Done",
    c: "ok"
  }];
  function ReposScreen() {
    const [path, setPath] = useState("/Users/dev/plan-builder");
    const [indexing, setIndexing] = useState(false);
    const [lines, setLines] = useState([]);
    const logRef = useRef(null);
    useEffect(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [lines]);
    function index() {
      if (!path || indexing) return;
      setIndexing(true);
      setLines([]);
      let i = 0;
      const timer = setInterval(() => {
        setLines(l => [...l, INDEX_LINES[i]]);
        i++;
        if (i >= INDEX_LINES.length) {
          clearInterval(timer);
          setIndexing(false);
        }
      }, 520);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "screen screen--narrow"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stack"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Repository Folder",
      hint: "dev-docs reads this codebase via RAG to ground every plan."
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement(Input, {
      value: path,
      mono: true,
      onChange: e => setPath(e.target.value),
      placeholder: "No folder selected",
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      startIcon: /*#__PURE__*/React.createElement(Icon, {
        name: "folder-open",
        size: 16
      })
    }, "Browse"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
      onClick: index,
      loading: indexing,
      disabled: !path
    }, indexing ? "Indexing…" : "Index Folder")), lines.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "terminal",
      ref: logRef
    }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: l.c || ""
    }, l.t)))));
  }

  /* ============================ Settings screen ============================ */
  function SettingsScreen() {
    const [key, setKey] = useState("");
    const [model, setModel] = useState("deepseek-chat");
    const [saved, setSaved] = useState(false);
    const [test, setTest] = useState("idle"); // idle | testing | success | error
    useEffect(() => {
      if (!saved) return;
      const t = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(t);
    }, [saved]);
    function save(e) {
      e.preventDefault();
      setSaved(true);
    }
    function runTest() {
      if (!key) {
        setTest("error");
        return;
      }
      setTest("testing");
      setTimeout(() => setTest("success"), 1100);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "screen screen--narrow"
    }, /*#__PURE__*/React.createElement("form", {
      className: "stack",
      onSubmit: save
    }, /*#__PURE__*/React.createElement(Field, {
      label: "OpenRouter API Key"
    }, /*#__PURE__*/React.createElement(Input, {
      type: "password",
      value: key,
      mono: true,
      placeholder: "sk-or-...",
      onChange: e => setKey(e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Model"
    }, /*#__PURE__*/React.createElement(Select, {
      value: model,
      onChange: e => setModel(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: "deepseek-chat"
    }, "deepseek-chat"), /*#__PURE__*/React.createElement("option", {
      value: "deepseek-reasoner"
    }, "deepseek-reasoner"), /*#__PURE__*/React.createElement("option", {
      value: "anthropic/claude-3.5-sonnet"
    }, "anthropic/claude-3.5-sonnet"))), /*#__PURE__*/React.createElement("div", {
      className: "stack stack--sm"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
      type: "submit"
    }, "Save")), /*#__PURE__*/React.createElement("div", {
      className: "statusline"
    }, saved && /*#__PURE__*/React.createElement("span", {
      className: "muted"
    }, "Saved"))), /*#__PURE__*/React.createElement("div", {
      className: "stack stack--sm"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
      type: "button",
      variant: "secondary",
      onClick: runTest,
      loading: test === "testing"
    }, test === "testing" ? "Testing…" : "Test Connection")), /*#__PURE__*/React.createElement("div", {
      className: "statusline",
      "aria-live": "polite"
    }, test === "success" && /*#__PURE__*/React.createElement("span", {
      className: "ok"
    }, "Connected"), test === "error" && /*#__PURE__*/React.createElement("span", {
      className: "err"
    }, "No API key \u2014 enter your key and click Save first.")))));
  }

  /* ============================ App shell ============================ */
  function App() {
    const [route, setRoute] = useState("chat");
    const title = route === "chat" ? "Chat" : route === "repos" ? "Repos" : "Settings";
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement(Rail, {
      route: route,
      onNavigate: setRoute
    }), /*#__PURE__*/React.createElement("div", {
      className: "main"
    }, route === "chat" && /*#__PURE__*/React.createElement(ChatScreen, null), route === "repos" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "topbar__title"
    }, title)), /*#__PURE__*/React.createElement(ReposScreen, null)), route === "settings" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "topbar__title"
    }, title)), /*#__PURE__*/React.createElement(SettingsScreen, null))));
  }
  window.PlanBuilderApp = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plan-builder/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plan-builder/ui.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    "sliders": ["M4 21v-7", "M4 10V3", "M12 21v-9", "M12 8V3", "M20 21v-5", "M20 12V3", "M1 14h6", "M9 8h6", "M17 16h6"]
  };
  function Icon({
    name,
    size = 20,
    style
  }) {
    const paths = ICONS[name] || [];
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      style: {
        display: "block",
        flexShrink: 0,
        ...style
      }
    }, paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
      key: i,
      d: d
    })));
  }

  /* ---- Button ---- */
  function Button({
    variant = "primary",
    size = "md",
    block,
    disabled,
    loading,
    startIcon,
    children,
    ...rest
  }) {
    const cls = ["dd-btn", `dd-btn--${variant}`, `dd-btn--${size}`, block ? "dd-btn--block" : ""].filter(Boolean).join(" ");
    return /*#__PURE__*/React.createElement("button", _extends({
      className: cls,
      disabled: disabled || loading
    }, rest), loading ? /*#__PURE__*/React.createElement("span", {
      className: "dd-spin"
    }) : startIcon, children);
  }

  /* ---- IconButton ---- */
  function IconButton({
    variant = "default",
    active,
    label,
    children,
    ...rest
  }) {
    const cls = ["dd-iconbtn", `dd-iconbtn--${variant}`, active ? "is-active" : ""].filter(Boolean).join(" ");
    return /*#__PURE__*/React.createElement("button", _extends({
      className: cls,
      "aria-label": label,
      "aria-pressed": active || undefined
    }, rest), children);
  }

  /* ---- Field / Input / Select / Textarea ---- */
  function Field({
    label,
    hint,
    error,
    htmlFor,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, label && /*#__PURE__*/React.createElement("label", {
      className: "dd-field-label",
      htmlFor: htmlFor
    }, label), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
      className: "dd-field-hint" + (error ? " dd-field-hint--error" : "")
    }, error || hint));
  }
  function Input({
    invalid,
    mono,
    className = "",
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("input", _extends({
      className: ["dd-field", invalid ? "dd-field--invalid" : "", mono ? "dd-field--mono" : "", className].filter(Boolean).join(" ")
    }, rest));
  }
  function Select({
    invalid,
    className = "",
    children,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("span", {
      className: "dd-select-wrap"
    }, /*#__PURE__*/React.createElement("select", _extends({
      className: ["dd-field", invalid ? "dd-field--invalid" : "", className].filter(Boolean).join(" ")
    }, rest), children));
  }
  const Textarea = React.forwardRef(function Textarea({
    invalid,
    mono,
    maxHeight = 120,
    autoGrow = true,
    className = "",
    onInput,
    ...rest
  }, ref) {
    function handle(e) {
      if (autoGrow) {
        const el = e.currentTarget;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
      }
      onInput && onInput(e);
    }
    return /*#__PURE__*/React.createElement("textarea", _extends({
      ref: ref,
      className: ["dd-field", invalid ? "dd-field--invalid" : "", mono ? "dd-field--mono" : "", className].filter(Boolean).join(" "),
      rows: 1,
      style: {
        maxHeight
      },
      onInput: handle
    }, rest));
  });

  /* ---- Card ---- */
  function Card({
    title,
    description,
    pad,
    hover,
    className = "",
    children,
    ...rest
  }) {
    const cls = ["dd-card", hover ? "dd-card--hover" : "", pad ? "dd-card--pad" : "", className].filter(Boolean).join(" ");
    return /*#__PURE__*/React.createElement("div", _extends({
      className: cls
    }, rest), (title || description) && /*#__PURE__*/React.createElement("div", {
      className: "dd-card-head"
    }, title && /*#__PURE__*/React.createElement("p", {
      className: "dd-card-title"
    }, title), description && /*#__PURE__*/React.createElement("p", {
      className: "dd-card-desc"
    }, description)), children && (title || description ? /*#__PURE__*/React.createElement("div", {
      className: "dd-card-body"
    }, children) : pad ? children : /*#__PURE__*/React.createElement("div", {
      className: "dd-card-body"
    }, children)));
  }

  /* ---- Badge ---- */
  function Badge({
    variant = "secondary",
    mono,
    dot,
    className = "",
    children,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: ["dd-badge", `dd-badge--${variant}`, mono ? "dd-badge--mono" : "", className].filter(Boolean).join(" ")
    }, rest), dot && /*#__PURE__*/React.createElement("span", {
      className: "dd-badge__dot"
    }), children);
  }

  /* ---- StatusBadge / PlanTypeTag ---- */
  const STATUS = {
    queued: {
      label: "Queued",
      bg: "var(--status-queued-soft)",
      fg: "#3f4a5a",
      dot: "var(--status-queued)"
    },
    active: {
      label: "Active",
      bg: "var(--status-active-soft)",
      fg: "#1d4ed8",
      dot: "var(--status-active)"
    },
    complete: {
      label: "Complete",
      bg: "var(--status-complete-soft)",
      fg: "#15803d",
      dot: "var(--status-complete)"
    },
    deferred: {
      label: "Deferred",
      bg: "var(--status-deferred-soft)",
      fg: "#92400e",
      dot: "var(--status-deferred)"
    },
    blocked: {
      label: "Blocked",
      bg: "var(--status-blocked-soft)",
      fg: "#b91c1c",
      dot: "var(--status-blocked)"
    }
  };
  function StatusBadge({
    status = "queued",
    children
  }) {
    const s = STATUS[status] || STATUS.queued;
    return /*#__PURE__*/React.createElement("span", {
      className: "dd-status",
      style: {
        background: s.bg,
        color: s.fg
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "dd-status__dot",
      style: {
        background: s.dot
      }
    }), children || s.label);
  }
  const TYPE = {
    d: "var(--type-d)",
    p: "var(--type-p)",
    r: "var(--type-r)"
  };
  function PlanTypeTag({
    type = "d",
    size = 24
  }) {
    return /*#__PURE__*/React.createElement("span", {
      className: "dd-type",
      style: {
        background: TYPE[type],
        width: size,
        height: size,
        fontSize: Math.round(size * 0.55)
      }
    }, type);
  }
  Object.assign(window, {
    Icon,
    Button,
    IconButton,
    Field,
    Input,
    Select,
    Textarea,
    Card,
    Badge,
    StatusBadge,
    PlanTypeTag
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plan-builder/ui.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.PlanTypeTag = __ds_scope.PlanTypeTag;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
