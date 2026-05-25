"use client";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { selectUser } from "@/src/redux/features/chat/chatSlice";

export default function ChatSidebar() {
  const dispatch = useAppDispatch();
  
  // Get current logged-in user from auth state (Dynamic)
  const currentUserId = useAppSelector((state) => state.auth?.user?.id) || 3;
  const { chatList, selectedUserId, loading } = useAppSelector((state) => state.chat);

  return (
    <div className="w-80 border-r overflow-y-auto flex-shrink-0 bg-white dark:bg-zinc-900">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
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
          // Dynamically determine the OTHER user
          const otherUserId =
            chat.sender_id === currentUserId ? chat.receiver_id : chat.sender_id;

          const isSelected = selectedUserId === otherUserId;

          return (
            <button
              key={chat.id ?? index}
              onClick={() => dispatch(selectUser(otherUserId))}
              className={`w-full p-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 border-l-2 border-transparent ${
                isSelected
                  ? "bg-rose-50 dark:bg-rose-950 border-l-rose-500"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-amber-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  U{otherUserId}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm">User {otherUserId}</div>
                  <div className="text-xs text-zinc-500 truncate">
                    {chat.message}
                  </div>
                </div>

                {/* Optional: Show time */}
                {chat.created_at && (
                  <div className="text-[10px] text-zinc-400 whitespace-nowrap">
                    {new Date(chat.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
            </button>
          );
        })
      )}
    </div>
  );
}