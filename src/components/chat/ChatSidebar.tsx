"use client";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import {useAppSelector} from "@/src/hooks/useAppSelector";
import { selectUser } from "@/src/redux/features/chat/chatSlice";

export default function ChatSidebar() {
  const dispatch = useAppDispatch();
  const { chatList, selectedUserId } = useAppSelector((s) => s.chat);

  return (
    <div className="w-80 border-r overflow-y-auto">
      {chatList.map((chat: any) => {
        const userId = chat.sender_id;

        return (
          <button
            key={chat.id}
            onClick={() => dispatch(selectUser(userId))}
            className={`w-full p-4 text-left hover:bg-zinc-50 ${
              selectedUserId === userId ? "bg-rose-50" : ""
            }`}
          >
            <div className="font-semibold">
              User {userId}
            </div>
            <div className="text-xs text-zinc-500 truncate">
              {chat.message}
            </div>
          </button>
        );
      })}
    </div>
  );
}