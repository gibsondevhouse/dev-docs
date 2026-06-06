import React from "react";

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
export function Card({
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
  const cls = [
    "dd-card",
    shadow ? "dd-card--shadow" : "",
    hover ? "dd-card--hover" : "",
    pad ? "dd-card--pad" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...rest}>
      {(title || description) && (
        <div className="dd-card-head">
          {title && <p className="dd-card-title">{title}</p>}
          {description && <p className="dd-card-desc">{description}</p>}
        </div>
      )}
      {(title || description) && children ? (
        <div className="dd-card-body">{children}</div>
      ) : pad ? (
        children
      ) : (
        children && <div className="dd-card-body">{children}</div>
      )}
    </div>
  );
}
