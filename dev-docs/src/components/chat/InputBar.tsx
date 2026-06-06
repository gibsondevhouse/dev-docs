import { Send } from "lucide-react";
import {
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

type InputBarProps = {
  disabled: boolean;
  onSend: (text: string) => void;
};

export function InputBar({ disabled, onSend }: InputBarProps) {
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
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  return (
    <div className="flex items-end gap-2 border-t bg-background p-3">
      <textarea
        className="max-h-[120px] min-h-[40px] flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
        disabled={disabled}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message…"
        ref={textareaRef}
        rows={1}
        value={value}
      />
      <button
        aria-label="Send"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        disabled={disabled || !value.trim()}
        onClick={submit}
        type="button"
      >
        {disabled ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
