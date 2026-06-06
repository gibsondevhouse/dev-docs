import * as React from "react";

/**
 * Small label/count pill. For plan status use StatusBadge instead.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "muted" | "success" | "destructive";
  /** Monospace text (IDs, counts, paths). */
  mono?: boolean;
  /** Leading status dot in the current text color. */
  dot?: boolean;
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): React.JSX.Element;
