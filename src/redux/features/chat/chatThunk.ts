import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/src/lib/api/chatApi";

export const fetchConversation = createAsyncThunk(
  "chat/conversation",
  async (userId: number) => {
    return await api.getConversation(userId);
  },
);

export const fetchMyChats = createAsyncThunk(
    "chat/myChats",
    async () => {
        return await api.getMyChat();
    }
);

export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async (
    data: {
      receiver_id: number;
      property_id?: number;
      message: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await api.sendMessage(data as any);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail ||
        "Failed to send message"
      );
    }
  }
);