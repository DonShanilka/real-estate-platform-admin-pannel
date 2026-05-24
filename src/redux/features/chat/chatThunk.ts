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
