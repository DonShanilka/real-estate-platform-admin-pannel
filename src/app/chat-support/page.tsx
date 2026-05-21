"use client";

import React, { useState } from "react";
import { Icons } from "@/src/components/Icons";

interface ChatSession {
  id: string;
  user: string;
  role: "Buyer" | "Agent" | "Seller";
  lastMessage: string;
  time: string;
  online: boolean;
  unread: boolean;
  messages: { sender: "user" | "admin"; text: string; time: string }[];
}

const initialSessions: ChatSession[] = [
  {
    id: "CH-301",
    user: "Sophia Martinez",
    role: "Buyer",
    lastMessage: "Is there any room for negotiations on the Ocean Villa?",
    time: "2 mins ago",
    online: true,
    unread: true,
    messages: [
      { sender: "user", text: "Hello, I am interested in booking the Oceanfront Penthouse.", time: "10:30 AM" },
      { sender: "admin", text: "Hello Sophia! I can definitely help you with that. Are you looking to buy or rent?", time: "10:32 AM" },
      { sender: "user", text: "I'd like to make an offer for purchase. Is there any room for negotiations on the Ocean Villa?", time: "10:35 AM" },
    ],
  },
  {
    id: "CH-302",
    user: "Sarah Jenkins",
    role: "Agent",
    lastMessage: "I uploaded the contract copy for the Sunset Beach House.",
    time: "1 hour ago",
    online: true,
    unread: false,
    messages: [
      { sender: "user", text: "Hey support! Quick question regarding the listing commission rates.", time: "09:12 AM" },
      { sender: "admin", text: "Hi Sarah! Rates are fixed at 5% gross for all sales listings. Let me know if you need contract templates.", time: "09:15 AM" },
      { sender: "user", text: "Got it! I uploaded the contract copy for the Sunset Beach House.", time: "09:18 AM" },
    ],
  },
  {
    id: "CH-303",
    user: "David Miller",
    role: "Seller",
    lastMessage: "How long does it take for my property listing approval?",
    time: "5 hours ago",
    online: false,
    unread: false,
    messages: [
      { sender: "user", text: "Hello! I submitted a listing for a new lakefront house in Austin yesterday.", time: "04:30 PM" },
      { sender: "user", text: "How long does it take for my property listing approval?", time: "04:31 PM" },
      { sender: "admin", text: "Hi David! Approval usually takes less than 24 hours. Our moderation team is currently reviewing it.", time: "04:45 PM" },
    ],
  },
];

export default function ChatSupport() {
  const [sessions, setSessions] = useState<ChatSession[]>(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState(initialSessions[0].id);
  const [typedMessage, setTypedMessage] = useState("");

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = { sender: "admin" as const, text: typedMessage, time: timestamp };

    setSessions(
      sessions.map((s) => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            lastMessage: typedMessage,
            unread: false,
            messages: [...s.messages, newMsg],
          };
        }
        return s;
      })
    );

    setTypedMessage("");
  };

  const handleSessionSelect = (id: string) => {
    setActiveSessionId(id);
    setSessions(
      sessions.map((s) => (s.id === id ? { ...s, unread: false } : s))
    );
  };

  return (
    <div className="h-[calc(100vh-140px)] flex border border-zinc-200 rounded-3xl overflow-hidden shadow-sm bg-white dark:bg-zinc-900 dark:border-zinc-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Left Chat Inbox Panel */}
      <div className="w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
          <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Support Chat Inbox</span>
          <p className="text-[10px] text-zinc-400 mt-0.5">Active agent & user sessions</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-zinc-50 dark:divide-zinc-800/30">
          {sessions.map((s) => {
            const isSelected = s.id === activeSessionId;
            return (
              <button
                key={s.id}
                onClick={() => handleSessionSelect(s.id)}
                className={`w-full text-left p-4 flex gap-3 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/30 relative ${
                  isSelected ? "bg-rose-50/30 border-r-2 border-rose-500 dark:bg-rose-950/10" : ""
                }`}
              >
                {/* User avatar indicator */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-white shadow-sm">
                    {s.user.substring(0, 2).toUpperCase()}
                  </div>
                  {s.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900"></span>
                  )}
                </div>

                {/* Chat detail block */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">{s.user}</span>
                    <span className="text-[9px] text-zinc-400">{s.time}</span>
                  </div>
                  <span className="text-[9px] font-bold text-rose-500 tracking-wider uppercase block">{s.role}</span>
                  <p className={`text-[11px] truncate mt-1 ${s.unread ? "text-zinc-900 font-bold dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {s.lastMessage}
                  </p>
                </div>

                {/* Unread circle badge */}
                {s.unread && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-rose-500"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Conversation Window */}
      <div className="flex-1 flex flex-col bg-zinc-50/30 dark:bg-zinc-900/10">
        {/* Header detail */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-white shadow-sm shrink-0">
              {activeSession.user.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{activeSession.user}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${activeSession.online ? "bg-emerald-500" : "bg-zinc-400"}`}></span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono block">{activeSession.id} • {activeSession.role} Support</span>
            </div>
          </div>
          <span className="text-[10px] text-zinc-400 font-bold bg-zinc-100 px-2 py-0.5 rounded dark:bg-zinc-800">Support Session</span>
        </div>

        {/* Scrollable chat body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeSession.messages.map((m, idx) => {
            const isAdmin = m.sender === "admin";
            return (
              <div key={idx} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-sm leading-relaxed ${
                  isAdmin
                    ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-tr-none"
                    : "bg-white border border-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 rounded-tl-none"
                }`}>
                  <p className="font-medium">{m.text}</p>
                  <span className={`text-[9px] block text-right ${isAdmin ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-400"}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Typing input */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 flex gap-2">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            placeholder="Type your support reply here..."
            className="flex-1 px-4 py-2 bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all dark:bg-zinc-850 dark:border-zinc-700 dark:text-zinc-200"
          />
          <button
            type="submit"
            className="p-2.5 bg-gradient-to-r from-rose-600 to-amber-500 text-white rounded-xl hover:opacity-90 shadow-md shadow-rose-500/10 transition-all flex items-center justify-center shrink-0"
          >
            <Icons.Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
