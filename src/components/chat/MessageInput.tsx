"use client";

import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: Props) {
    
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded-lg px-4"
      />

      <button
        onClick={handleSend}
        className="px-4 bg-black text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
