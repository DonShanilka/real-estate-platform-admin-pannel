"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { fetchMyChats } from "@/src/redux/features/chat/chatThunk";
import useChatSocket from "@/src/hooks/useChatSocket";
import ChatSidebar from "@/src/components/chat/ChatSidebar";
import ChatWindow from "@/src/components/chat/ChatWindow";

const CURRENT_USER_ID = 3;

export default function ChatPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyChats());
  }, [dispatch]);

  // WebSocket ONLY connects here on the chat page, not globally
  useChatSocket(CURRENT_USER_ID);

  return (
    <div className="h-[calc(100vh-120px)] flex bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border dark:border-zinc-800 shadow-sm">
      <ChatSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  );
}