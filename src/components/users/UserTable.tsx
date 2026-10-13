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
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-rose-600" />
        <p className="mt-4 text-sm text-gray-500">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              {["User", "Role", "Registered", "Status", "Action"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
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
                <td colSpan={5} className="px-5 py-14 text-center">
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
                  className="transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {user.profile_image ? (
                        <img
                          src={user.profile_image}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-full border border-gray-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-sm font-semibold text-rose-600">
                          {user.full_name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {user.full_name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {user.email}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        roleStyles[user.role] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {new Date(user.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-5 py-4">
                    <UserStatusBadge user={user} />
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() => onDelete(user)}
                      className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 px-5 py-3">
        <p className="text-xs text-gray-500">
          Showing {users.length} user{users.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
