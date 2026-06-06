import * as React from "react";

/**
 * A 40×40 square icon button. Used for the sidebar rail nav and the
 * chat composer Send action.
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ground the button sits on. */
  variant?: "default" | "primary" | "rail";
  /** Active/selected state (rail nav, toggles). */
  active?: boolean;
  /** Accessible label — required since the button is icon-only. */
  label: string;
  /** The icon element (Lucide component, <svg>, or <img>). */
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps): React.JSX.Element;
