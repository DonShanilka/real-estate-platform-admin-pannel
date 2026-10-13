"use client";

import type { UserRole } from "@/src/types/userTypes";

type RoleFilter = "ALL" | UserRole;

interface UserFiltersProps {
  searchQuery: string;
  roleFilter: RoleFilter;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: RoleFilter) => void;
}

const roles: { label: string; value: RoleFilter }[] = [
  { label: "All Users", value: "ALL" },
  { label: "Admins", value: "ADMIN" },
  { label: "Agents", value: "AGENT" },
  { label: "Buyers", value: "BUYER" },
];

export default function UserFilters({
  searchQuery,
  roleFilter,
  onSearchChange,
  onRoleChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      {/* Search Bar */}
      <div className="relative w-full xl:max-w-sm">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" strokeWidth={1.8} />
          <path
            strokeLinecap="round"
            strokeWidth={1.8}
            d="m16 16 4 4"
          />
        </svg>

        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search name, email or user ID..."
          aria-label="Search users"
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-black focus:ring-0"
        />
      </div>

      {/* Role Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {roles.map((role) => {
          const isActive = roleFilter === role.value;

          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onRoleChange(role.value)}
              aria-pressed={isActive}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors sm:px-3.5 ${
                isActive
                  ? "border-rose-600 bg-rose-600 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {role.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { RoleFilter };