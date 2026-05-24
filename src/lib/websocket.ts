"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addMessage } from "@/src/redux/features/chat/chatSlice";

export default function useChatSocket(userId: number | null) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/${userId}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(addMessage(data));
    };

    return () => ws.close();
  }, [userId]);
}