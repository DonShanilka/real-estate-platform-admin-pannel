import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ChatState, Message } from "@/src/types/chat";
import { fetchConversation, fetchMyChats, sendMessageThunk } from "./chatThunk";

const initialState: ChatState = {
  chatList: [],
  conversations: [],
  selectedUserId: null,
  selectedPropertyId: null,
  loading: false,
  chatListLoading: false,
  sending: false,
  isDemoConversation: false,
  error: null,
};

export const DEMO_BUYER_ID = 900001;

function appendMessageIfMissing(messages: Message[], message: Message) {
  if (!messages.some((item) => item.id === message.id)) {
    messages.push(message);
  }
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectUser: (
      state,
      action: PayloadAction<{ userId: number; propertyId: number | null }>,
    ) => {
      state.selectedUserId = action.payload.userId;
      state.selectedPropertyId = action.payload.propertyId;
      state.conversations = [];
      state.isDemoConversation = false;
      state.loading = false;
      state.error = null;
    },
    openDemoBuyerConversation: (
      state,
      action: PayloadAction<{ adminUserId: number; timestamp: string }>,
    ) => {
      const { adminUserId, timestamp } = action.payload;
      state.selectedUserId = DEMO_BUYER_ID;
      state.selectedPropertyId = null;
      state.isDemoConversation = true;
      state.loading = false;
      state.error = null;
      state.conversations = [
        {
          id: -1,
          sender_id: DEMO_BUYER_ID,
          receiver_id: adminUserId,
          message: "Hi, I’m interested in the property. Is it still available for a viewing this weekend?",
          is_read: true,
          created_at: timestamp,
        },
        {
          id: -2,
          sender_id: adminUserId,
          receiver_id: DEMO_BUYER_ID,
          message: "Hello! Yes, it is available. I can arrange a viewing for Saturday afternoon.",
          is_read: true,
          created_at: timestamp,
        },
        {
          id: -3,
          sender_id: DEMO_BUYER_ID,
          receiver_id: adminUserId,
          message: "Saturday works for me. Please let me know what time suits you.",
          is_read: true,
          created_at: timestamp,
        },
      ];
      state.chatList = [state.conversations[2], ...state.chatList];
    },
    clearSelectedUser: (state) => {
      state.selectedUserId = null;
      state.selectedPropertyId = null;
      state.conversations = [];
      state.isDemoConversation = false;
      state.loading = false;
      state.error = null;
    },
    receiveSocketMessage: (
      state,
      action: PayloadAction<{ message: Message; currentUserId: number }>,
    ) => {
      const { message, currentUserId } = action.payload;
      const otherUserId =
        message.sender_id === currentUserId ? message.receiver_id : message.sender_id;

      if (otherUserId === state.selectedUserId) {
        appendMessageIfMissing(state.conversations, message);
      }

      state.chatList = [
        message,
        ...state.chatList.filter(
          (item) =>
            item.id !== message.id &&
            (item.sender_id === currentUserId ? item.receiver_id : item.sender_id) !== otherUserId,
        ),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyChats.pending, (state) => {
        state.chatListLoading = true;
        state.error = null;
      })
      .addCase(fetchMyChats.fulfilled, (state, action) => {
        state.chatListLoading = false;
        state.chatList = state.isDemoConversation
          ? [...action.payload, ...state.chatList.filter((message) => message.id < 0)]
          : action.payload;
      })
      .addCase(fetchMyChats.rejected, (state, action) => {
        state.chatListLoading = false;
        state.error = action.payload ?? action.error.message ?? "Unable to load chats.";
      })
      .addCase(fetchConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        if (action.meta.arg === state.selectedUserId) {
          state.conversations = action.payload;
          state.loading = false;
        }
      })
      .addCase(fetchConversation.rejected, (state, action) => {
        if (action.meta.arg === state.selectedUserId) {
          state.loading = false;
          state.error = action.payload ?? action.error.message ?? "Unable to load conversation.";
        }
      })
      .addCase(sendMessageThunk.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload ?? action.error.message ?? "Unable to send message.";
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.sending = false;
        if (action.meta.arg.receiver_id === state.selectedUserId) {
          appendMessageIfMissing(state.conversations, action.payload);
        }
        state.chatList = [
          action.payload,
          ...state.chatList.filter((item) => item.id !== action.payload.id),
        ];
      });
  },
});

export const {
  selectUser,
  openDemoBuyerConversation,
  clearSelectedUser,
  receiveSocketMessage,
} = chatSlice.actions;
export default chatSlice.reducer;