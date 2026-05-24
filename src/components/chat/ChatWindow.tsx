"use client";

import { useEffect, useRef, useState } from "react";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";

import {
  fetchConversation,
  sendMessageThunk,
} from "@/src/redux/features/chat/chatThunk";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const dispatch = useAppDispatch();

  const { conversations, selectedUserId } = useAppSelector((s) => s.chat);

  const [text, setText] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const currentUserId = 1;

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchConversation(selectedUserId));
    }
  }, [selectedUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversations]);

  const sendMessage = () => {
    if (!selectedUserId || !text.trim()) return;

    dispatch(
      sendMessageThunk({
        receiver_id: selectedUserId,
        message: text,
      }),
    );

    setText("");
  };

  if (!selectedUserId) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversations.map((msg: any) => (
          <MessageBubble
            key={msg.id}
            message={msg.message}
            time={new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            isMine={msg.sender_id === currentUserId}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div className="p-3 border-t flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border rounded px-3 py-2"
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
