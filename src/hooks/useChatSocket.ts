"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addMessage } from "@/src/redux/features/chat/chatSlice";
import type { Message } from "@/src/redux/features/chat/chatSlice";

export default function useChatSocket(userId: number | null) {
  const dispatch = useAppDispatch();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Don't connect if no userId
    if (!userId) return;

    // Don't open a second connection if one already exists and is open
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    let isMounted = true;

    const connect = () => {
      const ws = new WebSocket(`ws://127.0.0.1:8000/ws/${userId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("[WS] Connected for user", userId);
      };

      ws.onmessage = (event) => {
        if (!isMounted) return;
        try {
          const data: Message = JSON.parse(event.data);
          dispatch(addMessage(data));
        } catch {
          console.error("[WS] Failed to parse message", event.data);
        }
      };

      ws.onerror = (err) => {
        console.error("[WS] Error:", err);
      };

      ws.onclose = (event) => {
        console.log("[WS] Closed, code:", event.code);
        wsRef.current = null;

        // Auto-reconnect after 3s unless unmounted or intentionally closed (code 1000)
        if (isMounted && event.code !== 1000) {
          setTimeout(() => {
            if (isMounted) connect();
          }, 3000);
        }
      };
    };

    connect();

    return () => {
      isMounted = false;
      if (wsRef.current) {
        wsRef.current.close(1000, "component unmounted");
        wsRef.current = null;
      }
    };
  }, [userId, dispatch]);
}
