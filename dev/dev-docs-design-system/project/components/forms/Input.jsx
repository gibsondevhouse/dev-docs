import React from "react";

const STYLE_ID = "dd-field-styles";
export function useFieldStyles() {
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
export function Field({ label, hint, error, htmlFor, children }) {
  useFieldStyles();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {label && (
        <label className="dd-field-label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {(error || hint) && (
        <span className={"dd-field-hint" + (error ? " dd-field-hint--error" : "")}>
          {error || hint}
        </span>
      )}
    </div>
  );
}

/**
 * Input — single-line text field. Matches the app's h-10 bordered input.
 */
export function Input({ invalid = false, mono = false, className = "", ...rest }) {
  useFieldStyles();
  const cls = [
    "dd-field",
    invalid ? "dd-field--invalid" : "",
    mono ? "dd-field--mono" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <input className={cls} {...rest} />;
}
