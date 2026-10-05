import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Message } from "@/src/types/chat";
import * as api from "@/src/lib/api/chatApi";

export const fetchMyChats = createAsyncThunk<Message[], void, { rejectValue: string }>(
  "chat/myChats",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getMyChat();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to load chats.");
    }
  },
);

export const fetchConversation = createAsyncThunk<Message[], number, { rejectValue: string }>(
  "chat/conversation",
  async (userId: number, { rejectWithValue }) => {
    try {
      return await api.getConversation(userId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to load conversation.");
    }
  }
);

export const sendMessageThunk = createAsyncThunk<
  Message,
  { receiver_id: number; property_id?: number; message: string },
  { rejectValue: string }
>(
  "chat/send",
  async (data, { rejectWithValue }) => {
    try {
      return await api.sendMessage(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to send message.");
    }
  },
);