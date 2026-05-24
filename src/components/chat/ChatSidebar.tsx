"use client";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { selectUser } from "@/src/redux/features/chat/chatSlice";

// The currently logged-in user (matches JWT user_id: 3)
const CURRENT_USER_ID = 3;

export default function ChatSidebar() {
  const dispatch = useAppDispatch();
  const { chatList, selectedUserId, loading } = useAppSelector((state) => state.chat);

  return (
    <div className="w-80 border-r overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b">
        <h2 className="font-bold text-sm uppercase tracking-wider text-zinc-500">
          Messages
        </h2>
      </div>

      {loading && chatList.length === 0 ? (
        <div className="p-4 text-sm text-zinc-400">Loading chats…</div>
      ) : chatList.length === 0 ? (
        <div className="p-4 text-sm text-zinc-500">No chats yet</div>
      ) : (
        chatList.map((chat, index) => {
          // Show the OTHER user, not current user
          const otherUserId =
            chat.sender_id === CURRENT_USER_ID ? chat.receiver_id : chat.sender_id;

          const isSelected = selectedUserId === otherUserId;

          return (
            <button
              key={chat.id ?? index}
              onClick={() => dispatch(selectUser(otherUserId))}
              className={`w-full p-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                isSelected
                  ? "bg-rose-50 dark:bg-rose-950 border-r-2 border-rose-500"
                  : ""
              }`}
            >
              {/* Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-amber-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  U{otherUserId}
                </div>

                <div className="min-w-0">
                  <div className="font-semibold text-sm">User {otherUserId}</div>
                  <div className="text-xs text-zinc-500 truncate">{chat.message}</div>
                </div>
              </div>
            </button>
          );
        })
      )}
    </div>
  );
}