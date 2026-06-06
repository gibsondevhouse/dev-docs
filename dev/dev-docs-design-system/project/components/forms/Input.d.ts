import * as React from "react";

/**
 * Single-line text field — the app's h-10 bordered input. Pair with
 * <Field> for a label + hint/error.
 *
 * @startingPoint section="Forms" subtitle="Labeled text input with hint & error" viewport="700x150"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Show the destructive (error) border. */
  invalid?: boolean;
  /** Render the value in the monospace stack (API keys, paths). */
  mono?: boolean;
}
export function Input(props: InputProps): React.JSX.Element;

export interface FieldProps {
  /** Label text rendered above the control. */
  label?: React.ReactNode;
  /** Helper text below the control. */
  hint?: React.ReactNode;
  /** Error text below the control (overrides hint, turns red). */
  error?: React.ReactNode;
  /** Matches the control's id for the label's htmlFor. */
  htmlFor?: string;
  children?: React.ReactNode;
}
/** Label + hint/error wrapper around any control (Input, Select, Textarea). */
export function Field(props: FieldProps): React.JSX.Element;
