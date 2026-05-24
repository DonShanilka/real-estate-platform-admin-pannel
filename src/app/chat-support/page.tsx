"use client";

import { useEffect, useRef } from "react";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";

import {
  fetchConversation,
  fetchMyChats,
  sendMessageThunk,
} from "@/src/redux/features/chat/chatThunk";

import ChatSidebar from "@/src/components/chat/ChatSidebar";
import MessageInput from "@/src/components/chat/MessageInput";
import MessageBubble from "@/src/components/chat/MessageBubble";

export default function ChatPage() {
  const dispatch = useAppDispatch();

  const { conversations, selectedUserId, loading } = useAppSelector(
    (state) => state.chat,
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  const currentUserId = 1;

  useEffect(() => {
    dispatch(fetchMyChats());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedUserId) return;

    dispatch(fetchConversation(selectedUserId));
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversations]);

  const handleSend = (message: string) => {
    if (!selectedUserId) return;

    dispatch(
      sendMessageThunk({
        receiver_id: selectedUserId,
        message,
      }),
    );
  };

  return (
    <div
      className=" h-[calc(100vh-120px)] flex bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border
      "
    >
      <ChatSidebar />

      <div className="flex-1 flex flex-col">
        {!selectedUserId ? (
          <div className="flex-1 flex items-center justify-center text-zinc-500">
            Select a chat from sidebar
          </div>
        ) : (
          <>
            <div className="p-4 border-b">
              <h2 className="font-semibold">Conversation</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading && <div>Loading...</div>}

              {conversations.map((msg: any) => (
                <MessageBubble
                  key={msg.id}
                  message={msg.message}
                  time={new Date(msg.created_at).toLocaleTimeString()}
                  isMine={msg.sender_id === currentUserId}
                />
              ))}

              <div ref={bottomRef} />
            </div>

            <MessageInput onSend={handleSend} />
          </>
        )}
      </div>
    </div>
  );
}
