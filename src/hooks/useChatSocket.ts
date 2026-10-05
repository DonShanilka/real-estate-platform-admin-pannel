"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { receiveSocketMessage } from "@/src/redux/features/chat/chatSlice";
import { logout } from "@/src/redux/features/auth/authSlice";
import type { Message } from "@/src/types/chat";

interface Props {
  currentUserId: number | null;
  token: string | null;        // ← Pass JWT token
}

function isExpiredJwt(token: string): boolean {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return true;

    const base64Payload = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64Payload)) as { exp?: unknown };
    return typeof payload.exp !== "number" || payload.exp <= Date.now() / 1000;
  } catch {
    return true;
  }
}

export default function useChatSocket({ currentUserId, token }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUserId || !token) return;
    if (isExpiredJwt(token)) {
      localStorage.removeItem("access_token");
      dispatch(logout());
      console.warn("Chat session expired. Sign in again to reconnect.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const socketUrl = new URL(apiUrl);
    // The local API server commonly binds IPv4 only; avoid localhost resolving to ::1.
    if (socketUrl.hostname === "localhost") socketUrl.hostname = "127.0.0.1";
    socketUrl.protocol = socketUrl.protocol === "https:" ? "wss:" : "ws:";
    socketUrl.pathname = `${socketUrl.pathname.replace(/\/$/, "")}/ws`;
    socketUrl.searchParams.set("token", token);

    const ws = new WebSocket(socketUrl.toString());

    ws.onopen = () => {
      console.info("Chat WebSocket connected");
    };

    ws.onerror = () => {
      console.error(`Chat WebSocket connection failed at ${socketUrl.origin}/ws`);
    };

    ws.onclose = (event) => {
      if (!event.wasClean) {
        console.warn(`Chat WebSocket closed unexpectedly (code ${event.code})`);
      }
    };

    ws.onmessage = (event) => {
      try {
        const data: unknown = JSON.parse(event.data);
        if (
          typeof data === "object" && data !== null &&
          "id" in data && typeof data.id === "number" &&
          "sender_id" in data && typeof data.sender_id === "number" &&
          "receiver_id" in data && typeof data.receiver_id === "number" &&
          "message" in data && typeof data.message === "string" &&
          "created_at" in data && typeof data.created_at === "string"
        ) {
          dispatch(receiveSocketMessage({
            message: data as Message,
            currentUserId,
          }));
        }
      } catch {
        // Ignore malformed frames so one bad event does not break the chat UI.
      }
    };

    return () => ws.close();
  }, [currentUserId, token, dispatch]);
}