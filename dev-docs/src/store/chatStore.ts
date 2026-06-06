import { create } from "zustand";
import type { ChatMessage } from "@/types/chat";

interface ChatState {
  messages: ChatMessage[];
  isStreaming: boolean;
  addMessage: (msg: ChatMessage) => void;
  appendToLastMessage: (token: string) => void;
  setStreaming: (v: boolean) => void;
  updateLastMessageOnError: (errorText: string) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isStreaming: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  appendToLastMessage: (token) =>
    set((s) => {
      const msgs = [...s.messages];
      const last = msgs[msgs.length - 1];
      if (last) msgs[msgs.length - 1] = { ...last, content: last.content + token };
      return { messages: msgs };
    }),
  setStreaming: (v) => set({ isStreaming: v }),
  updateLastMessageOnError: (errorText) =>
    set((s) => {
      const msgs = [...s.messages];
      const last = msgs[msgs.length - 1];
      if (last?.role === "assistant") {
        msgs[msgs.length - 1] = { ...last, content: errorText };
      }
      return { messages: msgs };
    }),
  clearHistory: () => set({ messages: [], isStreaming: false }),
}));
