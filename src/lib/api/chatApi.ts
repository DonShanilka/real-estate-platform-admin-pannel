import axios from "@/src/lib/axios";

export const getMyChat = async () => {
    const response = await axios.get("/chat/my");
    return response.data;
}

export const getConversation = async (otherUserId: number) => {
    const response = await axios.get(
        `/chat/conversation/${otherUserId}`
    );

    return response.data;
}; 

export const sendMessage = async (
    data: {
        reciver_id: number;
        property_id?: number;
        message: string;
    }
) => {
    const response = await axios.post(
        "/chat/send",
        data
    );

    return response.data;
};