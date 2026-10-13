"use client";

import React, { useState } from "react";

export default function FavoritesAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  const metrics = [
    {
      label: "Total Wishlists Created",
      value: "32,482",
      change: "+14.2%",
      isPositive: true,
    },
    {
      label: "Wishlist Additions Today",
      value: "842",
      change: "+5.8%",
      isPositive: true,
    },
    {
      label: "Conversion (Wishlist to Booking)",
      value: "3.4%",
      change: "-0.8%",
      isPositive: false,
    },
    {
      label: "Most Favorited Category",
      value: "Penthouses",
      change: "48%",
      isPositive: true,
    },
  ];

  const popularProperties = [
    {
      rank: 1,
      title: "Oceanfront Glass Penthouse",
      location: "Miami Beach, FL",
      price: "$1,850,000",
      favorites: "1,842 adds",
      conversion: "4.8% yield",
    },
    {
      rank: 2,
      title: "Serene Lakefront Eco-Villa",
      location: "Lake Tahoe, CA",
      price: "$2,400,000",
      favorites: "1,520 adds",
      conversion: "3.9% yield",
    },
    {
      rank: 3,
      title: "Modernist Forest Oasis Villa",
      location: "Portland, OR",
      price: "$980,000",
      favorites: "1,422 adds",
      conversion: "5.1% yield",
    },
    {
      rank: 4,
      title: "Luxury Downtown Highrise Apartment",
      location: "Austin, TX",
      price: "$3,800/mo",
      favorites: "982 adds",
      conversion: "6.4% yield",
    },
    {
      rank: 5,
      title: "Sunset Skyline Penthouse",
      location: "Miami Beach, FL",
      price: "$4,500/mo",
      favorites: "820 adds",
      conversion: "3.2% yield",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Analytics Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            Wishlist & Favorites Analytics
          </h2>

          <p className="mt-1 text-xs text-zinc-600">
            Track what properties buyers and renters are wishlisting most across
            the platform.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 self-start rounded-lg border border-zinc-200 bg-zinc-50 p-1 sm:self-auto">
          {["Weekly", "Monthly", "Yearly"].map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setSelectedPeriod(period)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedPeriod === period
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-600 hover:bg-white hover:text-zinc-900"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
          >
            <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
              {item.label}
            </span>

            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-extrabold text-zinc-950">
                {item.value}
              </span>

              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  item.isPositive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {item.change}
              </span>
            </div>

            <span className="mt-2 block text-[10px] text-zinc-500">
              Activity metric yield
            </span>
          </div>
        ))}
      </div>

      {/* Chart and Leaderboard */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Wishlist Additions Chart */}
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div>
            <h3 className="text-base font-bold text-zinc-900">
              Wishlist Additions Frequency
            </h3>

            <p className="mt-1 text-xs text-zinc-600">
              Total favorite additions made by users daily
            </p>
          </div>

          {/* SVG Chart */}
          <div className="relative h-64 w-full pt-4">
            <svg
              className="h-full w-full"
              viewBox="0 0 500 200"
              preserveAspectRatio="none"
              role="img"
              aria-label="Wishlist additions frequency chart"
            >
              {/* Grid Lines */}
              <line
                x1="0"
                y1="50"
                x2="500"
                y2="50"
                stroke="#e4e4e7"
                strokeWidth="1"
              />

              <line
                x1="0"
                y1="100"
                x2="500"
                y2="100"
                stroke="#e4e4e7"
                strokeWidth="1"
              />

              <line
                x1="0"
                y1="150"
                x2="500"
                y2="150"
                stroke="#e4e4e7"
                strokeWidth="1"
              />

              {/* Chart Area */}
              <path
                d="M 0 140 Q 80 160 160 110 T 320 80 T 420 50 T 500 90 L 500 200 L 0 200 Z"
                fill="url(#favoritesAreaGradient)"
              />

              {/* Chart Line */}
              <path
                d="M 0 140 Q 80 160 160 110 T 320 80 T 420 50 T 500 90"
                fill="none"
                stroke="url(#favoritesLineGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              <defs>
                <linearGradient
                  id="favoritesAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />

                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                </linearGradient>

                <linearGradient
                  id="favoritesLineGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </svg>

            {/* Chart Labels */}
            <div className="absolute bottom-0 left-0 flex w-full justify-between px-2 text-[10px] font-medium text-zinc-600">
              <span>Monday</span>
              <span>Wednesday</span>
              <span>Friday</span>
              <span>Sunday</span>
            </div>
          </div>
        </div>

        {/* Favorites Leaderboard */}
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-zinc-900">
              Favorites Leaderboard
            </h3>

            <p className="mt-1 text-xs text-zinc-600">
              Properties that are currently favorited the most
            </p>
          </div>

          <div className="space-y-4">
            {popularProperties.map((property) => (
              <div
                key={property.rank}
                className="group flex items-center gap-3"
              >
                {/* Ranking */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                    property.rank === 1
                      ? "bg-amber-500 text-white shadow-sm shadow-amber-500/10"
                      : property.rank === 2
                        ? "bg-zinc-200 text-zinc-800"
                        : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {property.rank}
                </div>

                {/* Property Information */}
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-bold text-zinc-900 transition-colors group-hover:text-rose-600">
                    {property.title}
                  </h4>

                  <span className="mt-1 block text-[10px] text-zinc-600">
                    {property.location} • {property.price}
                  </span>
                </div>

                {/* Favorites and Conversion */}
                <div className="shrink-0 text-right">
                  <span className="block text-xs font-bold text-rose-600">
                    {property.favorites}
                  </span>

                  <span className="mt-1 block text-[9px] text-zinc-600">
                    {property.conversion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
