"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { fetchConversation, sendMessageThunk } from "@/src/redux/features/chat/chatThunk";
import type { Message } from "@/src/redux/features/chat/chatSlice";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

// Must match JWT user_id claim
const CURRENT_USER_ID = 3;

interface Props {
  propertyId?: number;
}

export default function ChatWindow({ propertyId = 1 }: Props) {
  const dispatch = useAppDispatch();
  const { conversations, selectedUserId, loading } = useAppSelector((s) => s.chat);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchConversation(selectedUserId));
    }
  }, [selectedUserId, dispatch]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  const handleSend = (message: string) => {
    if (!selectedUserId) return;
    dispatch(
      sendMessageThunk({
        receiver_id: selectedUserId,
        property_id: propertyId,
        message,
      })
    );
  };

  if (!selectedUserId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-zinc-400 dark:text-zinc-500">
        <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-sm">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ChatHeader name={`User ${selectedUserId}`} online />

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50 dark:bg-zinc-950">
        {loading && (
          <div className="flex justify-center">
            <span className="text-xs text-zinc-400 animate-pulse">Loading messages…</span>
          </div>
        )}

        {!loading && conversations.length === 0 && (
          <div className="flex justify-center">
            <span className="text-xs text-zinc-400">No messages yet. Say hi!</span>
          </div>
        )}

        {conversations.map((msg: Message) => (
          <MessageBubble
            key={msg.id}
            message={msg.message}
            time={new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            // sender_id === CURRENT_USER_ID → my message → RIGHT side
            // sender_id !== CURRENT_USER_ID → their message → LEFT side
            isMine={msg.sender_id === CURRENT_USER_ID}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}