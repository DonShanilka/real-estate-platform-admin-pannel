"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { fetchMyChats } from "@/src/redux/features/chat/chatThunk";
import useChatSocket from "@/src/hooks/useChatSocket";
import ChatSidebar from "@/src/components/chat/ChatSidebar";
import ChatWindow from "@/src/components/chat/ChatWindow";

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth); // Assuming you have auth slice

  const currentUserId = user?.id || 2;

  useEffect(() => {
    dispatch(fetchMyChats());
  }, [dispatch]);

  useChatSocket({ currentUserId, token });

  return (
    <div className="h-[calc(100vh-120px)] flex bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border dark:border-zinc-800 shadow-sm">
      <ChatSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  );
}