import React from "react";

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
export function IconButton({
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
  const cls = [
    "dd-iconbtn",
    `dd-iconbtn--${variant}`,
    active ? "is-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      className={cls}
      type={type}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active || undefined}
      {...rest}
    >
      {children}
    </button>
  );
}
