"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { Icons } from "../layout/Icons";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/property-management": "Property Management",
  "/add-property": "Add New Property",
  "/nearby-map": "Nearby Properties Map",
  "/user-management": "User Account Management",
  "/booking-management": "Booking & Reservation Schedules",
  "/reviews-moderation": "Reviews Moderation Hub",
  "/favorites-analytics": "Favorites & Engagement Analytics",
  "/revenue-analytics": "Revenue & Financial Insights",
  "/chat-support": "Support Chat Center",
  "/settings": "System Settings",
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Real Estate Panel";

  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      text: "New booking request received for Ocean View Villa.",
      time: "3 mins ago",
      read: false,
    },
    {
      id: 2,
      text: "Property 'Sunset Penthouse' review requires moderation.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      text: "Revenue report for May 2026 has been generated.",
      time: "5 hours ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Page Title / Breadcrumb */}
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-gray-400">
          <span>Admin</span>
          <span className="text-gray-300">/</span>
          <span className="truncate">{title.split(" ")[0]}</span>
        </div>

        <h1 className="truncate text-lg font-bold leading-tight text-black">
          {title}
        </h1>
      </div>

      {/* Right Toolbar */}
      <div className="ml-4 flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Search Input */}
        <div className="relative hidden max-w-xs sm:block">
          <Icons.Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />

          <input
            type="search"
            placeholder="Search records, users..."
            aria-label="Search records and users"
            className="
              w-48 rounded-lg border border-gray-200 bg-white
              py-2 pl-9 pr-4 text-xs font-medium text-black
              placeholder:text-gray-400
              transition-colors
              focus:border-black focus:outline-none focus:ring-1 focus:ring-black
              md:w-64
            "
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((previous) => !previous)}
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={showNotifications}
            className="
              relative flex h-9 w-9 items-center justify-center
              rounded-lg text-gray-500 transition-colors
              hover:bg-gray-100 hover:text-black
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
            "
          >
            <Icons.Notification size={20} />

            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-black px-0.5 text-[8px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              {/* Backdrop */}
              <button
                type="button"
                aria-label="Close notifications"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setShowNotifications(false)}
              />

              {/* Notification Dropdown */}
              <div
                className="
                  absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))]
                  overflow-hidden rounded-xl border border-gray-200
                  bg-white p-4 shadow-xl shadow-black/5
                  animate-in fade-in slide-in-from-top-2 duration-200
                "
              >
                {/* Dropdown Header */}
                <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h2 className="text-sm font-semibold text-black">
                      Notifications
                    </h2>

                    <p className="mt-0.5 text-[10px] text-gray-500">
                      You have {unreadCount} unread notifications
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="
                      rounded-md px-2 py-1 text-xs font-medium text-gray-500
                      transition-colors hover:bg-gray-100 hover:text-black
                    "
                  >
                    Close
                  </button>
                </div>

                {/* Notification List */}
                <div className="max-h-80 space-y-1 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="
                        flex gap-3 rounded-lg p-3
                        transition-colors hover:bg-gray-50
                      "
                    >
                      {/* Status Indicator */}
                      <div className="pt-1">
                        <span
                          className={`
                            block h-2 w-2 rounded-full
                            ${notification.read ? "bg-gray-300" : "bg-black"}
                          `}
                        />
                      </div>

                      {/* Notification Content */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={`
                            text-xs leading-5
                            ${
                              notification.read
                                ? "font-normal text-gray-500"
                                : "font-medium text-gray-900"
                            }
                          `}
                        >
                          {notification.text}
                        </p>

                        <span className="mt-1 block text-[10px] text-gray-400">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dropdown Footer */}
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="
                      w-full rounded-lg border border-gray-200
                      bg-white px-3 py-2 text-xs font-semibold text-black
                      transition-colors hover:bg-gray-100
                    "
                  >
                    Close notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="hidden h-7 w-px bg-gray-200 sm:block" />

        {/* Server Time Indicator */}
        <div className="hidden text-right md:block">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            Server Time
          </p>

          <p className="text-xs font-semibold text-gray-700">23:33 GMT+5.5</p>
        </div>
      </div>
    </header>
  );
}
