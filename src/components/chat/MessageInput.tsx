"use client";

import { useState, KeyboardEvent } from "react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message…"
        disabled={disabled}
        className="flex-1 border dark:border-zinc-700 rounded-xl px-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 focus:ring-rose-400 transition disabled:opacity-50"
      />

      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
      >
        Send
      </button>
    </div>
  );
}
