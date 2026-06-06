import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import type { ChatMessage } from "@/types/chat";
import { forwardRef } from "react";

type MessageListProps = {
  messages: ChatMessage[];
};

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  function MessageList({ messages }, bottomRef) {
    if (messages.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Start chatting to build a plan.
        </div>
      );
    }

    return (
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={[
              "max-w-[75%] rounded-lg px-4 py-2 text-sm",
              msg.role === "user"
                ? "ml-auto bg-zinc-800 text-white"
                : "mr-auto bg-zinc-100 text-zinc-900",
            ].join(" ")}
          >
            {msg.role === "assistant" ? (
              <div className="prose prose-sm prose-zinc max-w-none dark:prose-invert">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {msg.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{msg.content}</p>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    );
  },
);
