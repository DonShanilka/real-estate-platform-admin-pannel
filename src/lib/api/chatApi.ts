import axios from "@/src/lib/axios";
import type { Message } from "@/src/types/chat";

export const getMyChat = async (): Promise<Message[]> => {
  const response = await axios.get<Message[]>("/chat/my");
  return response.data;
};

export const getConversation = async (otherUserId: number): Promise<Message[]> => {
  const response = await axios.get<Message[]>(`/chat/conversation/${otherUserId}`);
  return response.data;
};

export const sendMessage = async (data: {
  receiver_id: number;
  property_id?: number;
  message: string;
}): Promise<Message> => {
  const response = await axios.post<Message>("/chat/send", data);
  return response.data;
};