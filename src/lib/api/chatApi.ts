import axios from "@/src/lib/axios";

export const getMyChat = async () => {
  const response = await axios.get("/chat/my");
  return response.data;
};

export const getConversation = async (otherUserId: number) => {
  const response = await axios.get(`/chat/conversation/${otherUserId}`);
  return response.data;
};

export const sendMessage = async (data: {
  receiver_id: number;
  property_id: number;
  message: string;
}) => {
  const response = await axios.post("/chat/send", {
    receiver_id: data.receiver_id,
    property_id: data.property_id,
    message: data.message,
  });
  return response.data;
};