"use client";

import type { User } from "@/src/types/userTypes";
import UserStatusBadge from "./UserStatusBadge";

interface UserTableProps {
  users: User[];
  loading: boolean;
  deleting: boolean;
  onDelete: (user: User) => void;
}

const roleStyles: Record<string, string> = {
  ADMIN: "bg-rose-50 text-rose-700",
  AGENT: "bg-indigo-50 text-indigo-700",
  OWNER: "bg-amber-50 text-amber-700",
  BUYER: "bg-emerald-50 text-emerald-700",
};

export default function UserTable({
  users,
  loading,
  deleting,
  onDelete,
}: UserTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-rose-600" />
        <p className="mt-3 text-sm text-gray-500">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Scrollable Table Container */}
      <div className="max-h-[550px] overflow-auto">
        <table className="w-full min-w-[850px] text-left">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-gray-200 bg-gray-50">
              {["User", "Role", "Registered", "Status", "Action"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase 
                    tracking-wide text-gray-500"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center">
                  <p className="text-sm font-medium text-gray-700">
                    No users found
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Try changing your search or role filter.
                  </p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {/* User */}
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      {user.profile_image ? (
                        <img
                          src={user.profile_image}
                          alt={`${user.full_name}'s profile`}
                          className="h-8 w-8 shrink-0 rounded-full border border-gray-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full 
                        bg-rose-50 text-xs font-semibold text-rose-600">
                          {user.full_name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="max-w-[200px] truncate text-xs font-semibold text-gray-900">
                          {user.full_name}
                        </p>

                        <p className="mt-0.5 max-w-[200px] truncate text-[11px] text-gray-500">
                          {user.email}
                        </p>

                        <p className="mt-0.5 text-[10px] text-gray-400">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="whitespace-nowrap px-4 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        roleStyles[user.role] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Registered Date */}
                  <td className="whitespace-nowrap px-4 py-2.5 text-xs text-gray-600">
                    {new Date(user.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-4 py-2.5">
                    <UserStatusBadge user={user} />
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap px-4 py-2.5">
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() => onDelete(user)}
                      className="rounded-md border border-rose-200 px-2.5 py-1.5 text-[11px] font-medium 
                      text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2.5">
        <p className="text-[11px] text-gray-500">
          Showing {users.length} user{users.length === 1 ? "" : "s"}
        </p>

        {users.length > 6 && (
          <p className="text-[11px] text-gray-400">Scroll to view more ↓</p>
        )}
      </div>
    </div>
  );
}
