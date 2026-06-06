import React from "react";
import { useFieldStyles } from "./Input.jsx";

/**
 * Textarea — auto-growing multiline field. Mirrors the chat composer
 * (min 40px, grows to a max, Enter-to-send handled by the caller).
 */
export const Textarea = React.forwardRef(function Textarea({
  invalid = false,
  mono = false,
  maxHeight = 120,
  autoGrow = true,
  className = "",
  onInput,
  ...rest
}, ref) {
  useFieldStyles();
  const cls = [
    "dd-field",
    invalid ? "dd-field--invalid" : "",
    mono ? "dd-field--mono" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  function handleInput(e) {
    if (autoGrow) {
      const el = e.currentTarget;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    }
    onInput && onInput(e);
  }

  return (
    <textarea
      ref={ref}
      className={cls}
      rows={1}
      style={{ maxHeight: `${maxHeight}px` }}
      onInput={handleInput}
      {...rest}
    />
  );
});
