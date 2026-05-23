"use client";

import { usePathname } from "next/navigation";
import { Icons } from "../layout/Icons";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/property-management": "Property Management",
  "/add-property": "Add New Property",
  "/user-management": "User Account Management",
  "/booking-management": "Booking & Reservation Schedules",
  "/reviews-moderation": "Reviews Moderation Hub",
  "/favorites-analytics": "Favorites & Engagement Analytics",
  "/revenue-analytics": "Revenue & Financial Insights",
  "/chat-support": "Support Chat center",
  "/settings": "System Settings",
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Real Estate Panel";
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "New booking request received for Ocean View Villa.", time: "3 mins ago", read: false },
    { id: 2, text: "Property 'Sunset Penthouse' review requires moderation.", time: "1 hour ago", read: false },
    { id: 3, text: "Revenue report for May 2026 has been generated.", time: "5 hours ago", read: true },
  ];

  return (
    <header className="h-16 border-b border-zinc-200 bg-white px-6 flex items-center justify-between sticky top-0 z-40 dark:bg-zinc-950 dark:border-zinc-800">
      {/* Dynamic Title / Breadcrumb */}
      <div className="flex flex-col">
        <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
          Admin / {title.split(" ")[0]}
        </span>
        <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
          {title}
        </h1>
      </div>

      {/* Right Tools Bar */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative max-w-xs hidden sm:block">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            placeholder="Search records, users..."
            className="w-64 pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
          />
        </div>

        {/* Notifications Icon with simulated dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 rounded-lg relative transition-all dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900"
          >
            <Icons.Notification size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white dark:border-zinc-950"></span>
          </button>

          {showNotifications && (
            <>
              {/* Overlay Backdrop to close */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              ></div>

              <div className="absolute right-0 mt-2 w-80 bg-white border border-zinc-200 rounded-xl shadow-xl shadow-zinc-200/50 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-none">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">Notifications</span>
                  <button className="text-[10px] text-rose-500 hover:underline">Mark all read</button>
                </div>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex gap-2 text-xs group">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${notif.read ? "bg-zinc-300 dark:bg-zinc-700" : "bg-rose-500"}`} />
                      <div className="flex-1">
                        <p className={`text-zinc-700 dark:text-zinc-300 ${notif.read ? "" : "font-medium"}`}>
                          {notif.text}
                        </p>
                        <span className="text-[10px] text-zinc-400 mt-0.5 block">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800"></div>

        {/* Server Time Indicator (Quick Visual Detail) */}
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-zinc-400 font-medium">Server Time</p>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">23:33 GMT+5.5</p>
        </div>
      </div>
    </header>
  );
}
