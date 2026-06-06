import * as React from "react";

/**
 * Native select styled as a dev-docs field, with a custom chevron.
 * Used for the model picker in Settings.
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Show the destructive (error) border. */
  invalid?: boolean;
  /** <option> elements. */
  children?: React.ReactNode;
}
export function Select(props: SelectProps): React.JSX.Element;
