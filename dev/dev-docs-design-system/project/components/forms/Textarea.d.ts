import * as React from "react";

/**
 * Auto-growing multiline field — mirrors the chat composer.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show the destructive (error) border. */
  invalid?: boolean;
  /** Render in the monospace stack. */
  mono?: boolean;
  /** Max pixel height before it stops growing (default 120). */
  maxHeight?: number;
  /** Grow with content up to maxHeight (default true). */
  autoGrow?: boolean;
}
export function Textarea(props: TextareaProps): React.JSX.Element;
