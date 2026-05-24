import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/src/lib/api/chatApi";

export const fetchMyChats = createAsyncThunk("chat/myChats", async () => {
  return await api.getMyChat();
});

export const fetchConversation = createAsyncThunk(
  "chat/conversation",
  async (userId: number) => {
    return await api.getConversation(userId);
  }
);

export const sendMessageThunk = createAsyncThunk(
  "chat/send",
  async (data: {
    receiver_id: number;
    property_id: number;
    message: string;
  }) => {
    return await api.sendMessage(data);
  }
);