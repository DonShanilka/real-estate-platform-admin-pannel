import type { User } from "@/src/types/userTypes";

interface UserStatusBadgeProps {
  user: User;
}

export default function UserStatusBadge({ user }: UserStatusBadgeProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
          user.is_active
            ? "bg-emerald-50 text-emerald-700"
            : "bg-rose-50 text-rose-700"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            user.is_active ? "bg-emerald-500" : "bg-rose-500"
          }`}
        />
        {user.is_active ? "Active" : "Inactive"}
      </span>

      <span
        className={`text-xs font-medium ${
          user.is_verified ? "text-blue-600" : "text-amber-600"
        }`}
      >
        {user.is_verified ? "Verified" : "Not verified"}
      </span>
    </div>
  );
}
