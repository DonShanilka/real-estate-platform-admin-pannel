import { createSlice } from "@reduxjs/toolkit";
import { fetchConversation, fetchMyChats } from "./chatThunk";

interface ChatState {
  chatList: any[];
  conversations: any[];
  selectedUserId: number | null;
  loading: boolean;
}

const initialState: ChatState = {
  chatList: [],
  conversations: [],
  selectedUserId: null,
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUserId = action.payload;
    },
    addMessage: (state, action) => {
      state.conversations.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyChats.fulfilled, (state, action) => {
      state.chatList = action.payload;
    });

    builder.addCase(fetchConversation.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });
  },
});

export const { selectUser, addMessage } = chatSlice.actions;
export default chatSlice.reducer;