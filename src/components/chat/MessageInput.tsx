"use client";

import { useState } from "react";
import { Icons } from "@/src/components/layout/Icons";

interface Props {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: Props) {
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <form
      onSubmit={submit}
      className="p-4 border-t border-zinc-200 flex gap-2 bg-white dark:bg-zinc-900"
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        className=" flex-1 rounded-xl border border-zinc-200 px-4 py-2 text-sm"
      />

      <button
        type="submit"
        className=" p-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-50 text-whit "
      >
        <Icons.Send size={16} />
      </button>
    </form>
  );
}
