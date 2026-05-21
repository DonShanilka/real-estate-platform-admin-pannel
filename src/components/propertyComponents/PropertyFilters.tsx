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
      <div className="flex gap-2">
        {(["All", "Active", "Pending", "Sold"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-lg ${
              activeTab === tab ? "bg-black text-white" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative">
        <Icons.Search className="absolute left-3 top-3" size={16} />

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 py-2 border rounded-xl"
        />
      </div>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="border rounded-lg p-2"
      >
        <option value="All">All Categories</option>

        <option value={PropertyType.VILLA}>Villa</option>

        <option value={PropertyType.HOUSE}>House</option>

        <option value={PropertyType.APARTMENT}>Apartment</option>

        <option value={PropertyType.LAND}>Land</option>
      </select>
    </>
  );
}
