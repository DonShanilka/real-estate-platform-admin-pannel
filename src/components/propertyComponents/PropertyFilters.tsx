"use client";

import { Icons } from "@/src/components/Icons";
import { PropertyType } from "@/src/lib/api";

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
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 borader-b border-zinc-200 dark:border-zinc-800 pb-2">
        <div className="flex gap-2">
          {(["All", "Active", "Pending", "Sold"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all 
                ${activeTab == tab ? "bg-zinc-900 text-white dark:bg-zinc-900 shadow" :
                "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"}`}>
                {tab === "Active" ? "Available" : tab === "Sold" ? "Sold" : "All Properties"}
            </button>
          ))}
        </div>

        {/* category filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-400 font-medium">Category</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
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
    </>
  );
}
