import * as React from "react";

/**
 * The dev-docs surface: white, 1px border, 8px radius, usually no
 * shadow. Optional header (title/description) + body.
 *
 * @startingPoint section="Surfaces" subtitle="Bordered card with title & body" viewport="700x200"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header title. */
  title?: React.ReactNode;
  /** Header description (muted, below title). */
  description?: React.ReactNode;
  /** Float above the plane with a soft shadow instead of a border. */
  shadow?: boolean;
  /** Interactive hover affordance (border darken + soft shadow). */
  hover?: boolean;
  /** Apply default padding when there is no header. */
  pad?: boolean;
  children?: React.ReactNode;
}
export function Card(props: CardProps): React.JSX.Element;
