"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { receiveSocketMessage } from "@/src/redux/features/chat/chatSlice";

export default function useChatSocket(userId: number | null, token: string | null) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId || !token) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const socketUrl = new URL(apiUrl);
    if (socketUrl.hostname === "localhost") socketUrl.hostname = "127.0.0.1";
    socketUrl.protocol = socketUrl.protocol === "https:" ? "wss:" : "ws:";
    socketUrl.pathname = `${socketUrl.pathname.replace(/\/$/, "")}/ws`;
    socketUrl.searchParams.set("token", token);
    const ws = new WebSocket(socketUrl.toString());

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        dispatch(receiveSocketMessage({ message: data, currentUserId: userId }));
      } catch {
        // Ignore malformed WebSocket frames.
      }
    };

    return () => ws.close();
  }, [userId, token, dispatch]);
}
