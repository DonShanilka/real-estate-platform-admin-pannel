"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "./Icons";
import { useState } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { logout } from "@/src/redux/features/auth/authSlice";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Icons.Dashboard },
  {
    name: "Property Management",
    href: "/property-management",
    icon: Icons.Properties,
  },
  { name: "Nearby Map", href: "/nearby-map", icon: Icons.Search },
  // { name: "Add Property", href: "/add-property", icon: Icons.AddProperty },
  { name: "User Management", href: "/user-management", icon: Icons.Users },
  {
    name: "Booking Management",
    href: "/booking-management",
    icon: Icons.Bookings,
    badge: "8",
  },
  {
    name: "Reviews Moderation",
    href: "/reviews-moderation",
    icon: Icons.Reviews,
    badge: "3",
  },
  {
    name: "Favorites Analytics",
    href: "/favorites-analytics",
    icon: Icons.Favorites,
  },
  {
    name: "Revenue Analytics",
    href: "/revenue-analytics",
    icon: Icons.Revenue,
  },
  {
    name: "Chat Support",
    href: "/chat-support",
    icon: Icons.Chat,
    badge: "New",
  },
  { name: "Settings", href: "/settings", icon: Icons.Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("token");
    dispatch(logout());
    router.replace("/auth/login");
  };

  return (
    <aside
      className={`bg-zinc-950 text-zinc-100 flex flex-col border-r border-zinc-800 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } shrink-0 h-screen sticky top-0`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-white shadow-lg shadow-rose-950/20">
              E
            </div>
            <span className="font-semibold text-lg bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              EstateAdmin
            </span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto w-8 h-8 rounded-lg bg-linear-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-white shadow-lg">
            E
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                isActive
                  ? "bg-linear-to-r from-rose-600 to-amber-500 text-white shadow-md shadow-rose-950/20"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              }`}
            >
              <Icon
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-zinc-200"
                }`}
              />

              {!collapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}

              {!collapsed && item.badge && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    item.badge === "New"
                      ? "bg-rose-500 text-white"
                      : isActive
                        ? "bg-white/20 text-white"
                        : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700"
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-900 text-zinc-100 text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-md border border-zinc-800 z-50 whitespace-nowrap">
                  {item.name}
                  {item.badge && ` (${item.badge})`}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Session Quick Profile */}
      <div className="p-3 border-t border-zinc-800">
        <div
          className={`flex items-center gap-3 ${
            collapsed
              ? "justify-center"
              : "px-3 py-2 bg-zinc-900/50 rounded-lg border border-zinc-900"
          }`}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-rose-500/30 flex items-center justify-center bg-zinc-800 text-xs font-bold text-rose-400 shrink-0">
            JD
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-200 truncate">
                Administrator
              </p>
              <p className="text-[10px] text-zinc-500 truncate">
                Admin account
              </p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "Log out" : undefined}
          aria-label="Log out"
          className={`mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${collapsed ? "justify-center" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
