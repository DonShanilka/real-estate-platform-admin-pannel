"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Icons } from "./Icons";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { logout } from "@/src/redux/features/auth/authSlice";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.Dashboard,
  },
  {
    name: "Property Management",
    href: "/property-management",
    icon: Icons.Properties,
  },
  {
    name: "Nearby Map",
    href: "/nearby-map",
    icon: Icons.Search,
  },
  {
    name: "User Management",
    href: "/user-management",
    icon: Icons.Users,
  },
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
  // {
  //   name: "Favorites Analytics",
  //   href: "/favorites-analytics",
  //   icon: Icons.Favorites,
  // },
  {
    name: "Revenue Analytics",
    href: "/revenue-analytics",
    icon: Icons.Revenue,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Icons.Settings,
  },
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
      className={`
        sticky top-0 flex h-screen shrink-0 flex-col
        border-r border-gray-200 bg-white text-gray-900
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!collapsed && (
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-3"
            aria-label="EstateAdmin dashboard"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-lg font-bold text-white">
              E
            </div>

            <span className="truncate text-lg font-bold tracking-tight text-black">
              EstateAdmin
            </span>
          </Link>
        )}

        {collapsed && (
          <Link
            href="/dashboard"
            className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-black text-lg font-bold text-white"
            aria-label="EstateAdmin dashboard"
          >
            E
          </Link>
        )}

        <button
          type="button"
          onClick={() => setCollapsed((previous) => !previous)}
          className={`
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-lg text-gray-500
            transition-colors
            hover:bg-gray-100 hover:text-black
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-black
            ${collapsed ? "ml-0" : "ml-2"}
          `}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
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
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        aria-label="Admin navigation"
        className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent flex-1 space-y-1 overflow-y-auto p-3"
      >
        {!collapsed && (
          <p className="mb-3 px-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
            Main Menu
          </p>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={collapsed ? item.name : undefined}
              className={`
                group relative flex items-center gap-3
                rounded-lg px-3 py-2.5
                text-sm font-medium
                transition-colors duration-200
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black
                ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }
              `}
            >
              <Icon
                className={`
                  h-5 w-5 shrink-0
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-black"
                  }
                `}
              />

              {!collapsed && (
                <span className="min-w-0 flex-1 truncate">{item.name}</span>
              )}

              {!collapsed && item.badge && (
                <span
                  className={`
                    inline-flex min-w-5 items-center justify-center
                    rounded-md px-1.5 py-0.5
                    text-[10px] font-bold
                    ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                    }
                  `}
                >
                  {item.badge}
                </span>
              )}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <div
                  className="
                    pointer-events-none absolute left-full top-1/2 z-50
                    ml-3 -translate-y-1/2 translate-x-1
                    whitespace-nowrap rounded-lg
                    border border-gray-800 bg-gray-950
                    px-3 py-2 text-xs font-medium text-white
                    opacity-0 shadow-lg
                    transition-all duration-150
                    group-hover:translate-x-0
                    group-hover:opacity-100
                  "
                >
                  {item.name}

                  {item.badge && (
                    <span className="ml-2 text-gray-300">({item.badge})</span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Session Quick Profile */}
      <div className="border-t border-gray-200 p-3">
        <div
          className={`
            flex items-center gap-3 rounded-lg
            ${
              collapsed
                ? "justify-center"
                : "border border-gray-200 bg-gray-50 px-3 py-3"
            }
          `}
        >
          {/* Admin Avatar */}
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-full border border-gray-300
              bg-white text-xs font-bold text-black
            "
          >
            JD
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-900">
                Administrator
              </p>

              <p className="mt-0.5 truncate text-[10px] text-gray-500">
                Admin account
              </p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "Log out" : undefined}
          aria-label="Log out"
          className={`
            mt-2 flex w-full items-center gap-3
            rounded-lg px-3 py-2.5
            text-sm font-medium text-gray-600
            transition-colors duration-200
            hover:bg-gray-100 hover:text-black
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-black
            ${collapsed ? "justify-center" : ""}
          `}
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
            className="shrink-0"
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
