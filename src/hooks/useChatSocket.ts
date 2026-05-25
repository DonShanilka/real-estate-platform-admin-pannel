"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addMessage } from "@/src/redux/features/chat/chatSlice";

interface Props {
  currentUserId: number | null;
  token: string | null;        // ← Pass JWT token
}

export default function useChatSocket({ currentUserId, token }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUserId || !token) return;

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws?token=${token}`);

    ws.onopen = () => {
      console.log(`✅ WebSocket connected for user ${currentUserId}`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📨 Message received via WS:", data);
      dispatch(addMessage(data));
    };

    ws.onerror = (error) => console.error("❌ WebSocket error:", error);
    ws.onclose = () => console.log("🔌 WebSocket closed");

    return () => ws.close();
  }, [currentUserId, token, dispatch]);
}