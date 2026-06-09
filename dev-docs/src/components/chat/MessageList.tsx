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
    return (
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={[
              "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
              msg.role === "user"
                ? "ml-auto rounded-br-md bg-zinc-900 text-white"
                : "mr-auto rounded-bl-md bg-zinc-100 text-zinc-800",
            ].join(" ")}
          >
            {msg.role === "assistant" ? (
              <div className="prose prose-sm prose-zinc max-w-none">
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
