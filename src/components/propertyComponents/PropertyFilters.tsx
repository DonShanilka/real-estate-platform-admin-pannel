"use client";

import { Icons } from "@/src/components/Icons";
import { PropertyType } from "@/src/lib/api";
import React from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;

  activeTab: "All" | "Active" | "Pending" | "Sold";

  setActiveTab: (value: "All" | "Active" | "Pending" | "Sold") => void;

  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
}

export default function PropertyFilters({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  categoryFilter,
  setCategoryFilter,
}: Props) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 borader-b border-zinc-200 dark:border-zinc-800 pb-2">
        <div className="flex gap-2">
          {(["All", "Active", "Pending", "Sold"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all 
                ${
                  activeTab == tab
                    ? "bg-zinc-900 text-white dark:bg-zinc-900 shadow"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
            >
              {tab === "Active"
                ? "Available"
                : tab === "Sold"
                  ? "Sold"
                  : "All Properties"}
            </button>
          ))}
        </div>

        {/* category filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-400 font-medium">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1 bg-zinc-900 border-zinc-200 text-zinc-800 rounded-lg text-xs font-medium focus:outline-none dark:border-zinc-800 dark:text-zinc-200"
          >
            <option value="All">All Categories</option>
            <option value={PropertyType.VILLA}>Villas</option>
            <option value={PropertyType.APARTMENT}>Apartments</option>
            <option value={PropertyType.HOUSE}>Houses</option>
            <option value={PropertyType.LAND}>Land</option>
          </select>
        </div>
      </div>

      <div className="realative">
        <Icons.Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          size={16}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title, listing ID, address, city or category type..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 text-zinc-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
        />
      </div>
    </>
  );
}
