import { ArrowUp, Send } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type InputBarProps = {
  disabled: boolean;
  onSend: (text: string) => void;
  variant?: "hero" | "compact";
};

export function InputBar({ disabled, onSend, variant = "compact" }: InputBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  function submit() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "flex items-end gap-2 bg-background",
        isHero
          ? "rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm transition-shadow focus-within:border-zinc-300 focus-within:shadow-md"
          : "border-t p-3",
      )}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setValue(e.target.value);
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
        }}
        placeholder={isHero ? "Describe what you want to build…" : "Type a message…"}
        value={value}
        className={cn(
          "flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-zinc-400",
          isHero ? "min-h-[44px] px-3 py-2.5" : "min-h-[40px] px-3 py-2",
        )}
      />
      <button
        type="button"
        disabled={disabled || !value.trim()}
        onClick={submit}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg transition-all duration-150",
          isHero
            ? "h-9 w-9 bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400"
            : "h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50",
        )}
        aria-label="Send"
      >
        {disabled ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : isHero ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
