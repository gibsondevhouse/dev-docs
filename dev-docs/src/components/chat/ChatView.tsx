import { useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { InputBar } from "@/components/chat/InputBar";
import { MessageList } from "@/components/chat/MessageList";
import { streamChat } from "@/lib/api";
import { loadSettings } from "@/lib/settings";
import { useChatStore } from "@/store/chatStore";
import type { ChatMessage } from "@/types/chat";

export function ChatView() {
  const {
    messages,
    isStreaming,
    addMessage,
    appendToLastMessage,
    setStreaming,
    updateLastMessageOnError,
    clearHistory,
  } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text: string) {
    const userMsg: ChatMessage = { id: nanoid(), role: "user", content: text };
    const assistantMsg: ChatMessage = { id: nanoid(), role: "assistant", content: "" };

    addMessage(userMsg);
    addMessage(assistantMsg);
    setStreaming(true);

    try {
      const settings = await loadSettings();
      const history = useChatStore
        .getState()
        .messages.filter((m) => m.role !== "assistant" || m.content !== "")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      await streamChat(
        {
          apiKey: settings.openrouterApiKey,
          model: settings.selectedModel,
          messages: history,
          persistDir: settings.repoPath || undefined,
        },
        (token) => {
          appendToLastMessage(token);
        },
      );
    } catch (err) {
      updateLastMessageOnError(
        `_Error: ${err instanceof Error ? err.message : "Unknown error"}_`,
      );
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="flex h-full min-h-0">
      {/* Chat pane */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center justify-between border-b px-4">
          <span className="text-sm font-medium">Chat</span>
          <button
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={clearHistory}
            type="button"
          >
            Clear
          </button>
        </div>
        <MessageList messages={messages} ref={bottomRef} />
        <InputBar disabled={isStreaming} onSend={handleSend} />
      </div>

      {/* Preview pane placeholder */}
      <div className="flex w-80 shrink-0 flex-col border-l">
        <div className="flex h-12 shrink-0 items-center border-b px-4">
          <span className="text-sm font-medium text-muted-foreground">Preview</span>
        </div>
        <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
          Plan preview will appear here.
        </div>
      </div>
    </div>
  );
}
