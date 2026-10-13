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
//   { label: "Owners", value: "OWNER" },
  { label: "Buyers", value: "BUYER" },
];

export default function UserFilters({
  searchQuery,
  roleFilter,
  onSearchChange,
  onRoleChange,
}: UserFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => onRoleChange(role.value)}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
              roleFilter === role.value
                ? "bg-rose-600 text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:max-w-sm">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="7" strokeWidth={1.8} />

          <path strokeLinecap="round" strokeWidth={1.8} d="m16 16 4 4" />
        </svg>

        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search name, email or user ID..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 
          text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 
          focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
        />
      </div>
    </div>
  );
}

export type { RoleFilter };
