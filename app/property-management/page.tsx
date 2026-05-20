"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: "For Sale" | "For Rent";
  category: "Villa" | "Apartment" | "Penthouse" | "House";
  status: "Active" | "Pending" | "Sold";
  beds: number;
  baths: number;
  sqft: number;
  agent: string;
}

const initialProperties: Property[] = [
  { id: "P-101", title: "Oceanfront Glass Penthouse", location: "Miami Beach, FL", price: "$1,850,000", type: "For Sale", category: "Penthouse", status: "Active", beds: 4, baths: 4.5, sqft: 3800, agent: "Sarah Jenkins" },
  { id: "P-102", title: "Modernist Forest Oasis Villa", location: "Portland, OR", price: "$980,000", type: "For Sale", category: "Villa", status: "Active", beds: 3, baths: 3, sqft: 2900, agent: "Alex Rivera" },
  { id: "P-103", title: "Luxury Downtown Highrise Apartment", location: "Austin, TX", price: "$3,800/mo", type: "For Rent", category: "Apartment", status: "Pending", beds: 2, baths: 2, sqft: 1450, agent: "Emma Watson" },
  { id: "P-104", title: "Chic Eastside Craftsman House", location: "Portland, OR", price: "$640,000", type: "For Sale", category: "House", status: "Sold", beds: 3, baths: 2, sqft: 1850, agent: "Sarah Jenkins" },
  { id: "P-105", title: "Sunset Skyline Penthouse", location: "Miami Beach, FL", price: "$4,500/mo", type: "For Rent", category: "Penthouse", status: "Active", beds: 2, baths: 2.5, sqft: 1600, agent: "Emma Watson" },
  { id: "P-106", title: "Serene Lakefront Eco-Villa", location: "Lake Tahoe, CA", price: "$2,400,000", type: "For Sale", category: "Villa", status: "Active", beds: 5, baths: 5, sqft: 4200, agent: "Alex Rivera" },
];

export default function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Pending" | "Sold">("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.agent.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "All" || p.status === activeTab;
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;

    return matchesSearch && matchesTab && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Top action header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs text-zinc-400">Total properties cataloged: {properties.length} listings</p>
        </div>
        <Link
          href="/add-property"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-500/10 hover:shadow-lg hover:shadow-rose-500/20 hover:scale-[1.02] transition-all self-start sm:self-auto"
        >
          <Icons.Plus size={16} />
          Add Property Listing
        </Link>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <div className="flex gap-2">
          {(["All", "Active", "Pending", "Sold"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-400 font-medium">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1 bg-white border border-zinc-200 text-zinc-800 rounded-lg text-xs font-medium focus:outline-none dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
          >
            <option value="All">All Categories</option>
            <option value="Villa">Villas</option>
            <option value="Apartment">Apartments</option>
            <option value="Penthouse">Penthouses</option>
            <option value="House">Houses</option>
          </select>
        </div>
      </div>

      {/* Search Input Filter */}
      <div className="relative">
        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title, ID, agent, or city location..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 text-zinc-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
        />
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-300 transition-all flex flex-col group dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              {/* Photo representation and visual accent */}
              <div className="h-44 bg-gradient-to-tr from-zinc-800 via-zinc-900 to-zinc-950 p-4 flex flex-col justify-between relative text-white">
                <div className="flex justify-between items-start z-10">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                      prop.type === "For Sale" ? "bg-rose-500" : "bg-amber-500"
                    }`}
                  >
                    {prop.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      prop.status === "Active"
                        ? "bg-emerald-500 text-white"
                        : prop.status === "Pending"
                        ? "bg-amber-500 text-white"
                        : "bg-zinc-600 text-white"
                    }`}
                  >
                    {prop.status}
                  </span>
                </div>
                <div className="z-10">
                  <span className="text-[10px] text-zinc-400 font-mono block">{prop.id}</span>
                  <span className="text-lg font-extrabold text-white">{prop.price}</span>
                </div>
                {/* Visual gradient backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Information body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">{prop.category}</span>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-rose-500 transition-colors">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-medium">{prop.location}</p>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 py-2 border-y border-zinc-50 dark:border-zinc-800/50">
                  <span className="flex items-center gap-1">🛏 {prop.beds} Beds</span>
                  <span className="flex items-center gap-1">🛁 {prop.baths} Baths</span>
                  <span className="flex items-center gap-1">📐 {prop.sqft} sqft</span>
                </div>

                {/* Agent & Actions footer */}
                <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-[9px] text-zinc-700">
                      {prop.agent.substring(0, 2)}
                    </div>
                    <span className="font-semibold text-zinc-600 dark:text-zinc-300 truncate max-w-[80px]">
                      {prop.agent}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-all dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
                      title="Edit property"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteProperty(prop.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-all dark:hover:bg-rose-950/20"
                      title="Delete property"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-3 dark:bg-zinc-900 dark:border-zinc-800">
          <p className="text-sm font-semibold text-zinc-500">No properties found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTab("All");
              setCategoryFilter("All");
            }}
            className="text-xs text-rose-500 font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
