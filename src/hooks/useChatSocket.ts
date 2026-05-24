"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addMessage } from "@/src/redux/features/chat/chatSlice";
import type { Message } from "@/src/redux/features/chat/chatSlice";

export default function useChatSocket(userId: number | null) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/${userId}`);

    ws.onmessage = (event) => {
      try {
        const data: Message = JSON.parse(event.data);
        dispatch(addMessage(data));
      } catch {
        console.error("Failed to parse WebSocket message", event.data);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, [userId, dispatch]);
}