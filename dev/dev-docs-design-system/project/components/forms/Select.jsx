import React from "react";
import { useFieldStyles } from "./Input.jsx";

/**
 * Select — native select styled to match the dev-docs field, with a
 * custom chevron. Used for the model picker in Settings.
 */
export function Select({ invalid = false, className = "", children, ...rest }) {
  useFieldStyles();
  const cls = ["dd-field", invalid ? "dd-field--invalid" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <span className="dd-select-wrap">
      <select className={cls} {...rest}>
        {children}
      </select>
    </span>
  );
}
