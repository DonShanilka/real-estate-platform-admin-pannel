"use client";

import React, { useState } from "react";
import { Icons } from "@/src/components/Icons";

export default function FavoritesAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  const metrics = [
    { label: "Total Wishlists Created", value: "32,482", change: "+14.2%", isPositive: true },
    { label: "Wishlist Additions Today", value: "842", change: "+5.8%", isPositive: true },
    { label: "Conversion (Wishlist to Booking)", value: "3.4%", change: "-0.8%", isPositive: false },
    { label: "Most Favorited Category", value: "Penthouses", change: "48%", isPositive: true },
  ];

  const popularProperties = [
    { rank: 1, title: "Oceanfront Glass Penthouse", location: "Miami Beach, FL", price: "$1,850,000", favorites: "1,842 adds", conversion: "4.8% yield" },
    { rank: 2, title: "Serene Lakefront Eco-Villa", location: "Lake Tahoe, CA", price: "$2,400,000", favorites: "1,520 adds", conversion: "3.9% yield" },
    { rank: 3, title: "Modernist Forest Oasis Villa", location: "Portland, OR", price: "$980,000", favorites: "1,422 adds", conversion: "5.1% yield" },
    { rank: 4, title: "Luxury Downtown Highrise Apartment", location: "Austin, TX", price: "$3,800/mo", favorites: "982 adds", conversion: "6.4% yield" },
    { rank: 5, title: "Sunset Skyline Penthouse", location: "Miami Beach, FL", price: "$4,500/mo", favorites: "820 adds", conversion: "3.2% yield" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Visual analytics banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div>
          <h2 className="text-xl font-bold">Wishlist & Favorites Analytics</h2>
          <p className="text-zinc-400 text-xs mt-1">Track what properties buyers and renters are wishlisting most across the platform.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-800/80 p-1 rounded-lg border border-zinc-700/50 self-start sm:self-auto">
          {["Weekly", "Monthly", "Yearly"].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                selectedPeriod === p ? "bg-white text-zinc-950 shadow" : "text-zinc-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700"
          >
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">{item.label}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-zinc-950 dark:text-zinc-50">{item.value}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  item.isPositive ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                }`}
              >
                {item.change}
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 block">Activity metric yield</span>
          </div>
        ))}
      </div>

      {/* Chart and Ranking Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Sparkline Wishlist Addition Frequency */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm lg:col-span-2 space-y-4 dark:bg-zinc-900 dark:border-zinc-800">
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">Wishlist Additions Frequency</h3>
            <p className="text-xs text-zinc-400">Total favorite additions made by users daily</p>
          </div>

          <div className="h-64 w-full relative pt-4">
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="500" y2="50" stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />

              {/* Area path representing conversions */}
              <path
                d="M 0 140 Q 80 160 160 110 T 320 80 T 420 50 T 500 90 L 500 200 L 0 200 Z"
                fill="url(#grad2)"
              />
              <path
                d="M 0 140 Q 80 160 160 110 T 320 80 T 420 50 T 500 90"
                fill="none"
                stroke="url(#roseGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="roseGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] text-zinc-400 font-medium">
              <span>Monday</span>
              <span>Wednesday</span>
              <span>Friday</span>
              <span>Sunday</span>
            </div>
          </div>
        </div>

        {/* Most wishlisted list */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4 dark:bg-zinc-900 dark:border-zinc-800">
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">Favorites Leaderboard</h3>
            <p className="text-xs text-zinc-400">Properties that are currently favorited the most</p>
          </div>

          <div className="space-y-4">
            {popularProperties.map((prop) => (
              <div key={prop.rank} className="flex gap-3 items-center group">
                {/* Ranking rank */}
                <div className={`w-6 h-6 rounded-lg font-bold text-[11px] flex items-center justify-center shrink-0 ${
                  prop.rank === 1
                    ? "bg-amber-500 text-white shadow shadow-amber-500/10"
                    : prop.rank === 2
                    ? "bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                }`}>
                  {prop.rank}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-rose-500 transition-colors">
                    {prop.title}
                  </h4>
                  <span className="text-[10px] text-zinc-400 block">{prop.location} • {prop.price}</span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-rose-500 block">{prop.favorites}</span>
                  <span className="text-[9px] text-zinc-400">{prop.conversion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
