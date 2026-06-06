import * as React from "react";

/**
 * The primary dev-docs action control — dark, quiet, functional.
 * Matches the app's h-10 rounded-md text-sm medium buttons.
 *
 * @startingPoint section="Buttons" subtitle="Primary action button with variants" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Primary is near-black slate (the default action). */
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  /** Control height. md = 40px (the app default). */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the container width. */
  block?: boolean;
  /** Show a spinner and disable interaction (in-flight state). */
  loading?: boolean;
  /** Optional leading icon (e.g. a Lucide <Send /> element). */
  startIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): React.JSX.Element;
