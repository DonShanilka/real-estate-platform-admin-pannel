import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "@/src/types/chat";

interface ChatState {
    conversations: Message[];
    chatList: Message[];
    selectedUserId: number | null;
    loading: boolean;
}

const initialState: ChatState = {
    conversations: [],
    chatList: [], 
    selectedUserId: null,
    loading:false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setConversation(
            state,
            action: PayloadAction<Message[]>
        ) {
            state.conversations = action.payload;
        },

        addMessage(
            state,
            action: PayloadAction<Message>
        ) {
            state.conversations.push(
                action.payload
            );
        },

        setChatList(
            state,
            action: PayloadAction<Message[]>
        ) {
            state.chatList = action.payload;
        },

        selectUser (
            state,
            action: PayloadAction<number>
        ) {
            state.selectedUserId = action.payload;
        },
    },
});

export const {setConversation, addMessage, setChatList, selectUser} = chatSlice.actions;
export default chatSlice.reducer;
