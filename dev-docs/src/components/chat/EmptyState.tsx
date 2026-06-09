import { Sparkles, Code, FileText, Search } from "lucide-react";
import { InputBar } from "@/components/chat/InputBar";

type EmptyStateProps = {
  disabled: boolean;
  onSend: (text: string) => void;
};

const suggestions = [
  {
    icon: Code,
    label: "Plan a feature",
    prompt: "Help me plan a new feature for my app. Walk me through the steps.",
  },
  {
    icon: FileText,
    label: "Write documentation",
    prompt: "Generate documentation for a React component library.",
  },
  {
    icon: Search,
    label: "Research a topic",
    prompt: "Research best practices for building a Tauri desktop app.",
  },
  {
    icon: Sparkles,
    label: "Brainstorm ideas",
    prompt: "Brainstorm ideas for improving developer workflow tooling.",
  },
];

export function EmptyState({ disabled, onSend }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        {/* Brand mark */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-lg ring-1 ring-white/10">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            What do you want to build?
          </h1>
          <p className="text-sm text-zinc-500">
            Describe your project and I&apos;ll help you create a structured development plan.
          </p>
        </div>

        {/* Suggestion chips */}
        <div className="grid w-full grid-cols-2 gap-2">
          {suggestions.map((s) => (
            <button
              key={s.label}
              disabled={disabled}
              onClick={() => onSend(s.prompt)}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-left text-sm transition-all duration-150 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                <s.icon className="h-4 w-4 text-zinc-500" />
              </div>
              <div>
                <div className="font-medium text-zinc-700">{s.label}</div>
                <div className="text-xs text-zinc-400 truncate max-w-[180px]">
                  {s.prompt}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Input — centered, wider, more prominent */}
        <div className="w-full">
          <InputBar disabled={disabled} onSend={onSend} variant="hero" />
        </div>

        <p className="text-xs text-zinc-400">
          Dev Docs can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
