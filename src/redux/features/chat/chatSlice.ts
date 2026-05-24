import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConversation, fetchMyChats, sendMessageThunk } from "./chatThunk";

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
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

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
      // Clear old conversation when switching users
      state.conversations = [];
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      // Avoid duplicate messages
      const exists = state.conversations.some((m) => m.id === action.payload.id);
      if (!exists) {
        state.conversations.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    // fetchMyChats
    builder.addCase(fetchMyChats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMyChats.fulfilled, (state, action) => {
      state.loading = false;
      state.chatList = action.payload;
    });
    builder.addCase(fetchMyChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch chats";
    });

    // fetchConversation
    builder.addCase(fetchConversation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchConversation.fulfilled, (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    });
    builder.addCase(fetchConversation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch conversation";
    });

    // sendMessageThunk
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      if (action.payload) {
        const exists = state.conversations.some((m) => m.id === action.payload.id);
        if (!exists) {
          state.conversations.push(action.payload);
        }
      }
    });
  },
});

export const { selectUser, addMessage } = chatSlice.actions;
export default chatSlice.reducer;