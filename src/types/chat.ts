export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  property_id?: number | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatUser {
  id: number;
  name: string;
  avatar?: string;
}

export interface ChatState {
  conversations: Message[];
  chatList: Message[];
  selectedUserId: number | null;

  loading: boolean;
  error: string | null;
}