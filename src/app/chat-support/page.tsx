"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { fetchMyChats } from "@/src/redux/features/chat/chatThunk";
import { loginSuccess } from "@/src/redux/features/auth/authSlice";
import useChatSocket from "@/src/hooks/useChatSocket";
import ChatSidebar from "@/src/components/chat/ChatSidebar";
import ChatWindow from "@/src/components/chat/ChatWindow";

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const { userId, token } = useAppSelector((state) => state.auth);
  // Older admin tokens in this app do not always include a numeric ID claim.
  const currentUserId = userId ?? 3;
  const selectedUserId = useAppSelector((state) => state.chat.selectedUserId);

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) dispatch(loginSuccess(storedToken));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) dispatch(fetchMyChats());
  }, [dispatch, token]);

  useChatSocket({ currentUserId, token });

  return (
    <div className="h-[calc(100vh-120px)] flex bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border dark:border-zinc-800 shadow-sm">
      <div className={`${selectedUserId !== null ? "hidden" : "flex"} w-full md:flex md:w-80 md:shrink-0`}>
        <ChatSidebar currentUserId={currentUserId} />
      </div>
      <div className={`${selectedUserId === null ? "hidden" : "flex"} min-w-0 flex-1 flex-col overflow-hidden md:flex`}>
        <ChatWindow currentUserId={currentUserId} />
      </div>
    </div>
  );
}