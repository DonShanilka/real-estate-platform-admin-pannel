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

const CURRENT_USER_ID = 3;

function deduplicateChatList(chats: ChatItem[]): ChatItem[] {
  const seen = new Map<number, ChatItem>();

  for (const chat of chats) {
    // Always key by the OTHER user's id
    const otherUserId =
      chat.sender_id === CURRENT_USER_ID ? chat.receiver_id : chat.sender_id;

    if (!seen.has(otherUserId)) {
      seen.set(otherUserId, chat);
    } else {
      // Keep the most recent message for this user
      const existing = seen.get(otherUserId)!;
      if (new Date(chat.created_at) > new Date(existing.created_at)) {
        seen.set(otherUserId, chat);
      }
    }
  }

  return Array.from(seen.values());
}

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
    builder.addCase(fetchMyChats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMyChats.fulfilled, (state, action) => {
      state.loading = false;
      // Deduplicate so same user only appears once in sidebar
      state.chatList = deduplicateChatList(action.payload);
    });
    builder.addCase(fetchMyChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch chats";
    });

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