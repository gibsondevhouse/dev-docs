import * as React from "react";

/**
 * The methodology's plan-status pill — the dev-docs state language.
 *
 * @startingPoint section="Surfaces" subtitle="Plan status & type indicators" viewport="700x140"
 */
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Plan status. Defaults to "queued". */
  status?: "queued" | "active" | "complete" | "deferred" | "blocked";
  /** Override the default label text. */
  children?: React.ReactNode;
}
export function StatusBadge(props: StatusBadgeProps): React.JSX.Element;

export interface PlanTypeTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Plan type: d development · p polishing · r refactoring. */
  type?: "d" | "p" | "r";
  /** Square size. sm 18 · md 24 · lg 30. */
  size?: "sm" | "md" | "lg";
}
/** The d/p/r plan-type square, matching plan-folder prefixes. */
export function PlanTypeTag(props: PlanTypeTagProps): React.JSX.Element;
