"use client";

import { BookingStatus } from "@/src/types/booking";

interface BookingFiltersProps {
  statusFilter: BookingStatus | "all";
  searchQuery: string;
  onStatusFilterChange: (status: BookingStatus | "all") => void;
  onSearchChange: (query: string) => void;
}

const STATUS_OPTIONS: { value: BookingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
];

export default function BookingFilters({
  statusFilter,
  searchQuery,
  onStatusFilterChange,
  onSearchChange,
}: BookingFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
      {/* Status tabs */}
      <div className="flex gap-2">
        {STATUS_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onStatusFilterChange(value)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              statusFilter === value
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {label} Bookings
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs w-full">
        {/* Search icon — using inline SVG to avoid Icons dependency */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search guest or property title..."
          className="w-full pl-9 pr-4 py-1.5 bg-white border border-zinc-200 text-zinc-800 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
        />
      </div>
    </div>
  );
}
