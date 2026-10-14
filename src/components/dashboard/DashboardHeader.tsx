"use client";

import React from "react";

import type { DashboardPeriod } from "@/src/redux/features/dashboard/dashboardTypes";

interface DashboardHeaderProps {
  selectedPeriod: DashboardPeriod;
  onPeriodChange: (period: DashboardPeriod) => void;
  onRefresh: () => void;
  loading: boolean;
  lastUpdated: string | null;
}

const periods: {
  label: string;
  value: DashboardPeriod;
}[] = [
  { label: "This Week", value: "weekly" },
  { label: "This Month", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

export default function DashboardHeader({
  selectedPeriod,
  onPeriodChange,
  onRefresh,
  loading,
  lastUpdated,
}: DashboardHeaderProps) {
  return (
    <section
      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white 
    p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 className="text-xl font-bold text-black">EstateAI Dashboard</h1>

        <p className="mt-1 text-xs text-gray-500">
          Overview of properties, bookings and favorites.
        </p>

        {lastUpdated && (
          <p className="mt-2 text-[10px] text-gray-400">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              type="button"
              onClick={() => onPeriodChange(period.value)}
              aria-pressed={selectedPeriod === period.value}
              className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                selectedPeriod === period.value
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-white hover:text-black"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs 
          font-semibold text-black transition-colors hover:bg-gray-50 
          disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    </section>
  );
}
