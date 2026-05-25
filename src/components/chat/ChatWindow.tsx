"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { fetchConversation } from "@/src/redux/features/chat/chatThunk";
import type { Message } from "@/src/redux/features/chat/chatSlice";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ propertyId = 1 }) {
  const dispatch = useAppDispatch();
  const { conversations, selectedUserId, loading } = useAppSelector((s: any) => s.chat);
  const currentUserId = useAppSelector((state: any) => state.auth?.user?.id) || 3; // Dynamic from auth

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchConversation(selectedUserId));
    }
  }, [selectedUserId, dispatch]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  const handleSend = (text: string) => {
    if (!selectedUserId) return;
    dispatch(sendMessageThunk({
      receiver_id: selectedUserId,
      property_id: propertyId,
      message: text,
    }));
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ChatHeader name={`User ${selectedUserId}`} online />

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-950">
        {loading && <p className="text-center text-zinc-400">Loading messages...</p>}

        {conversations.length === 0 && !loading && (
          <p className="text-center text-zinc-500 py-12">No messages yet.</p>
        )}

        {conversations.map((msg: Message) => (
          <MessageBubble
            key={msg.id}
            message={msg.message}
            time={new Date(msg.created_at).toLocaleTimeString([], { 
              hour: '2-digit', minute: '2-digit' 
            })}
            isMine={msg.sender_id === currentUserId}   // ← Dynamic & Correct
          />
        ))}

        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}