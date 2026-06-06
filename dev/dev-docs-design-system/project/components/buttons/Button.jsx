import React from "react";

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
export function Button({
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
  const cls = [
    "dd-btn",
    `dd-btn--${variant}`,
    `dd-btn--${size}`,
    block ? "dd-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={cls} type={type} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span
          aria-hidden="true"
          style={{
            width: "1em",
            height: "1em",
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            display: "inline-block",
            animation: "dd-spin 0.7s linear infinite",
          }}
        />
      ) : (
        startIcon
      )}
      {children}
      <style>{"@keyframes dd-spin{to{transform:rotate(360deg)}}"}</style>
    </button>
  );
}
