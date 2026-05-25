import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConversation, fetchMyChats, sendMessageThunk } from "./chatThunk";

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  property_id?: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatItem {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
}

interface ChatState {
  chatList: ChatItem[];
  conversations: Message[];
  selectedUserId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chatList: [],
  conversations: [],
  selectedUserId: null,
  loading: false,
  error: null,
};

const CURRENT_USER_ID = 3;

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
      state.conversations = [];
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const exists = state.conversations.some((m) => m.id === action.payload.id);
      if (!exists) {
        state.conversations.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyChats.fulfilled, (state, action) => {
        state.chatList = action.payload;
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.conversations = action.payload || [];
        state.loading = false;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        if (action.payload) state.conversations.push(action.payload);
      });
  },
});

export const { selectUser, addMessage } = chatSlice.actions;
export default chatSlice.reducer;