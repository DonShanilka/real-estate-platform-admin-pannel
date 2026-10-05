"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { clearSelectedUser, DEMO_BUYER_ID } from "@/src/redux/features/chat/chatSlice";
import { sendMessageThunk } from "@/src/redux/features/chat/chatThunk";
import type { Message } from "@/src/types/chat";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface Props {
  currentUserId: number | null;
}

export default function ChatWindow({ currentUserId }: Props) {
  const dispatch = useAppDispatch();
  const { conversations, selectedUserId, selectedPropertyId, loading, sending, error, isDemoConversation } = useAppSelector((state) => state.chat);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  const handleSend = (text: string) => {
    if (selectedUserId === null) return;
    const payload: { receiver_id: number; property_id?: number; message: string } = {
      receiver_id: selectedUserId,
      message: text,
    };
    if (selectedPropertyId !== null) payload.property_id = selectedPropertyId;
    void dispatch(sendMessageThunk(payload));
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {selectedUserId === null ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-zinc-50 px-6 text-center dark:bg-zinc-950">
          <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">Select a conversation</h2>
          <p className="text-sm text-zinc-500">Choose a conversation from the list to read and reply.</p>
        </div>
      ) : (
        <>
          <ChatHeader
            name={selectedUserId === DEMO_BUYER_ID ? "Sample Buyer" : `User ${selectedUserId}`}
            onBack={() => dispatch(clearSelectedUser())}
          />

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50 dark:bg-zinc-950">
            {isDemoConversation && (
              <p className="mx-auto w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                Demo conversation — sample messages only
              </p>
            )}
            {error && <p role="alert" className="text-center text-sm text-rose-500">{error}</p>}
            {loading && <p className="text-center text-zinc-400">Loading messages...</p>}

            {conversations.length === 0 && !loading && !error && (
              <p className="text-center text-zinc-500 py-12">No messages yet.</p>
            )}

            {conversations.map((msg: Message) => {
              const isAdminMessage = String(msg.sender_id) !== String(selectedUserId);

              return (
                <MessageBubble
                  key={msg.id}
                  message={msg.message}
                  time={new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit", minute: "2-digit",
                  })}
                  senderLabel={isAdminMessage ? "Admin" : "Buyer"}
                  isMine={isAdminMessage}
                />
              );
            })}

            <div ref={bottomRef} />
          </div>

          <MessageInput onSend={handleSend} disabled={isDemoConversation || sending || currentUserId === null} />
        </>
      )}
    </div>
  );
}