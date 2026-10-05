"use client";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import {
  DEMO_BUYER_ID,
  openDemoBuyerConversation,
  selectUser,
} from "@/src/redux/features/chat/chatSlice";
import { fetchConversation } from "@/src/redux/features/chat/chatThunk";
import type { Message } from "@/src/types/chat";

interface Props {
  currentUserId: number | null;
}

export default function ChatSidebar({ currentUserId }: Props) {
  const dispatch = useAppDispatch();
  const { chatList, selectedUserId, chatListLoading, error } = useAppSelector((state) => state.chat);

  const latestByUser = new Map<number, Message>();
  if (currentUserId !== null) {
    for (const message of chatList) {
      const otherUserId = String(message.sender_id) === String(currentUserId)
        ? message.receiver_id
        : message.sender_id;
      const normalizedOtherUserId = Number(otherUserId);
      if (!Number.isInteger(normalizedOtherUserId) || normalizedOtherUserId <= 0) continue;
      const latest = latestByUser.get(normalizedOtherUserId);
      if (!latest || new Date(message.created_at).getTime() >= new Date(latest.created_at).getTime()) {
        latestByUser.set(normalizedOtherUserId, message);
      }
    }
  }
  const conversations = [...latestByUser.entries()].sort(
    ([, first], [, second]) => new Date(second.created_at).getTime() - new Date(first.created_at).getTime(),
  );

  return (
    <div className="w-full overflow-y-auto border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 md:w-80 md:shrink-0">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="font-bold text-sm uppercase tracking-wider text-zinc-500">
          Messages
        </h2>
      </div>

      {currentUserId === null ? (
        <div className="p-4 text-sm text-zinc-400">Sign in with an account that has a numeric user ID to view conversations.</div>
      ) : chatListLoading && chatList.length === 0 ? (
        <div className="p-4 text-sm text-zinc-400">Loading chats…</div>
      ) : error && chatList.length === 0 ? (
        <div className="p-4 text-sm text-rose-500">{error}</div>
      ) : conversations.length === 0 ? (
        <div className="space-y-3 p-4">
          <p className="text-sm text-zinc-500">No real chats yet. Open this sample to preview buyer messages.</p>
          <button
            type="button"
            onClick={() => dispatch(openDemoBuyerConversation({
              adminUserId: currentUserId,
              timestamp: new Date().toISOString(),
            }))}
            className="w-full rounded-xl border border-zinc-200 p-3 text-left transition hover:border-rose-300 hover:bg-rose-50 dark:border-zinc-700 dark:hover:bg-rose-950/30"
          >
            <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-100">Sample Buyer</span>
            <span className="mt-1 block truncate text-xs text-zinc-500">Is it still available for a viewing this weekend?</span>
            <span className="mt-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">DEMO</span>
          </button>
        </div>
      ) : (
        conversations.map(([otherUserId, chat]) => {
          const isSelected = selectedUserId === otherUserId;
          const isDemo = otherUserId === DEMO_BUYER_ID;

          return (
            <button
              key={otherUserId}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                if (isDemo) {
                  dispatch(openDemoBuyerConversation({
                    adminUserId: currentUserId,
                    timestamp: new Date().toISOString(),
                  }));
                  return;
                }
                dispatch(selectUser({ userId: otherUserId, propertyId: chat.property_id ?? null }));
                dispatch(fetchConversation(otherUserId));
              }}
              className={`w-full p-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 border-l-2 border-transparent ${
                isSelected
                  ? "bg-rose-50 dark:bg-rose-950 border-l-rose-500"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-rose-500 to-amber-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {isDemo ? "B" : `U${otherUserId}`}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm">{isDemo ? "Sample Buyer" : `User ${otherUserId}`}</div>
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