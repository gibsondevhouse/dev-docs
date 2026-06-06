import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onInput"> & {
  mono?: boolean;
  maxHeight?: number;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ mono, maxHeight = 120, className, ...rest }, ref) {
    function handleInput(e: React.FormEvent<HTMLTextAreaElement>) {
      const el = e.currentTarget;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    }

    return (
      <textarea
        ref={ref}
        rows={1}
        onInput={handleInput}
        className={cn(
          "min-h-[40px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
          mono && "font-mono",
          className,
        )}
        {...rest}
      />
    );
  },
);
