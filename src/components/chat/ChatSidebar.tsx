"use client";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";

import { selectUser } from "@/src/redux/features/chat/chatSlice";

export default function ChatSidebar() {
  const dispatch = useAppDispatch();

  const { chatList, selectedUserId } = useAppSelector((state) => state.chat);

  if (!chatList.length) {
    return (
      <div className="p-4 text-sm text-zinc-500">No conversations found</div>
    );
  }

  return (
    <div className="w-80 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto">
      {chatList.map((chat: any) => {
        const userId = chat.sender_id;

        return (
          <button
            key={chat.id}
            onClick={() => dispatch(selectUser(userId))}
            className={` w-full p-4 flex gap-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800
              ${
                selectedUserId === userId
                  ? "bg-rose-50 border-r-2 border-rose-500"
                  : ""
              }
            `}
          >
            <div
              className=" w-10 h-10 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white flex items-center justify-center font-bold
              "
            >
              U
            </div>

            <div className="flex-1">
              <div className="font-medium text-sm">User {userId}</div>

              <div className="text-xs text-zinc-500 truncate">
                {chat.message}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
