"use client";

import { useEffect, useRef } from "react";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";

import {
  fetchConversation,
  sendMessageThunk,
} from "@/src/redux/features/chat/chatThunk";

import ChatHeader from "@/src/components/chat/ChatHeader";
import MessageBubble from "@/src/components/chat/MessageBubble";
import MessageInput from "@/src/components/chat/MessageInput";

export default function ChatPage() {
  const dispatch = useAppDispatch();

  const {
    conversations,
    chatList,
    selectedUserId,
    loading,
  } = useAppSelector((state) => state.chat);

  const bottomRef = useRef<HTMLDivElement>(null);

  const currentUserId = 1;

  const selectedChat = chatList.find(
    (chat) =>
      chat.sender_id === selectedUserId ||
      chat.receiver_id === selectedUserId
  );

  useEffect(() => {
    if (!selectedUserId) return;

    dispatch(fetchConversation(selectedUserId));
  }, [selectedUserId, dispatch]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversations]);

  const handleSendMessage = (message: string) => {
    if (!selectedUserId) return;

    dispatch(
      sendMessageThunk({
        receiver_id: selectedUserId,
        message,
      })
    );
  };

  if (!selectedUserId) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-500">
        Select a chat from sidebar
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden">

      <ChatHeader
        name={`User ${selectedUserId}`}
        online={true}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {loading && (
          <div className="text-center text-zinc-500">
            Loading...
          </div>
        )}

        {conversations.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.message}
            time={new Date(
              msg.created_at
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            isMine={
              msg.sender_id === currentUserId
            }
          />
        ))}

        <div ref={bottomRef} />
      </div>

      <MessageInput
        onSend={handleSendMessage}
      />
    </div>
  );
}