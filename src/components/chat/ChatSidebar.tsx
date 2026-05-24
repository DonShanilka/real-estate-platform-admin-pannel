"use client";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { selectUser } from "@/src/redux/features/chat/chatSlice";

export default function ChatSidebar() {
  const dispatch = useAppDispatch();

  const { chatList, selectedUserId } =
    useAppSelector((state) => state.chat);

  return (
    <div className="w-80 border-r overflow-y-auto">
      {chatList.length === 0 ? (
        <div className="p-4 text-sm text-zinc-500">
          No chats
        </div>
      ) : (
        chatList.map((chat: any, index: number) => {
          const userId = chat.sender_id ?? chat.receiver_id;

          return (
            <button
              key={chat.id ?? index}
              onClick={() =>
                dispatch(selectUser(userId))
              }
              className={`w-full p-4 text-left hover:bg-zinc-50 ${
                selectedUserId === userId
                  ? "bg-rose-50 border-r-2 border-rose-500"
                  : ""
              }`}
            >
              <div className="font-semibold text-sm">
                User {userId}
              </div>

              <div className="text-xs text-zinc-500 truncate">
                {chat.message}
              </div>
            </button>
          );
        })
      )}
    </div>
  );
}