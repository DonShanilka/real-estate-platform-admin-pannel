"use client";

import React, { useState } from "react";
import { Icons } from "@/src/components/layout/Icons";
export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState("This Month");

  const stats = [
    {
      label: "Total Properties",
      value: "1,248",
      change: "+12.4%",
      isPositive: true,
      icon: Icons.Properties,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      label: "Active Bookings",
      value: "382",
      change: "+8.2%",
      isPositive: true,
      icon: Icons.Bookings,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      label: "Monthly Revenue",
      value: "$45,280",
      change: "+18.7%",
      isPositive: true,
      icon: Icons.Revenue,
      gradient: "from-rose-500 to-amber-600",
    },
    {
      label: "Open Inquiries",
      value: "29",
      change: "-4.5%",
      isPositive: false,
      icon: Icons.Chat,
      gradient: "from-violet-500 to-purple-600",
    },
  ];

  const recentBookings = [
    { id: "B-9201", customer: "Sophia Martinez", property: "Sunset Beach Villa", date: "May 20, 2026", amount: "$1,200", status: "Confirmed" },
    { id: "B-9202", customer: "Michael Chen", property: "Luxury Downtown Loft", date: "May 19, 2026", amount: "$850", status: "Pending" },
    { id: "B-9203", customer: "Emma Watson", property: "Modern Hillside Manor", date: "May 18, 2026", amount: "$2,400", status: "Confirmed" },
    { id: "B-9204", customer: "James Anderson", property: "Cozy Lakefront Cabin", date: "May 18, 2026", amount: "$620", status: "Cancelled" },
  ];

  const topProperties = [
    { id: 1, title: "Grand Oceanfront Penthouse", location: "Miami, FL", price: "$1,850,000", rating: 4.9, views: 1842, image: "/placeholder-prop1.jpg" },
    { id: 2, title: "Modernist Forest Sanctuary", location: "Portland, OR", price: "$980,000", rating: 4.8, views: 1422, image: "/placeholder-prop2.jpg" },
    { id: 3, title: "Chic Minimalist Townhouse", location: "Austin, TX", price: "$720,000", rating: 4.7, views: 955, image: "/placeholder-prop3.jpg" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Top Banner section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-6 rounded-2xl border border-zinc-800 text-white shadow-xl shadow-zinc-950/20">
        <div>
          <h2 className="text-xl font-bold">Welcome back, Admin Panel Console!</h2>
          <p className="text-zinc-400 text-xs mt-1">Here is a quick overview of what is happening across the platform today.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-800/80 p-1 rounded-lg border border-zinc-700/50 self-start sm:self-auto">
          {["This Week", "This Month", "Yearly"].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                selectedRange === range ? "bg-white text-zinc-950 shadow" : "text-zinc-400 hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex items-start justify-between relative overflow-hidden group hover:shadow-md hover:border-zinc-300 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              {/* Card visual gradient accents */}
              <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${stat.gradient}`} />

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
                <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">{stat.value}</h3>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded ${
                      stat.isPositive ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
                    }`}
                  >
                    {stat.isPositive ? <Icons.ArrowUp size={10} /> : <Icons.ArrowDown size={10} />}
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-zinc-400">vs prev month</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl bg-gradient-to-tr ${stat.gradient} text-white shadow-lg shadow-indigo-500/10 group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Properties section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Sparkline Analytics Chart */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm lg:col-span-2 space-y-4 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">Revenue Stream Chart</h3>
              <p className="text-xs text-zinc-400">Showing platform commission split & bookings yield</p>
            </div>
            <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded dark:bg-rose-950/20">Live Sync</span>
          </div>

          {/* Simple and elegant pure SVG Chart */}
          <div className="h-64 w-full relative pt-4">
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />

              {/* Area Path */}
              <path
                d="M 0 160 Q 100 120 180 140 T 300 70 T 400 90 T 500 40 L 500 200 L 0 200 Z"
                fill="url(#gradient)"
              />
              {/* Line Path */}
              <path
                d="M 0 160 Q 100 120 180 140 T 300 70 T 400 90 T 500 40"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </svg>
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] text-zinc-400 font-medium">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
            </div>
          </div>
        </div>

        {/* Hot Properties */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4 dark:bg-zinc-900 dark:border-zinc-800">
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">Top Viewed Properties</h3>
            <p className="text-xs text-zinc-400">Highly engaging property listings this week</p>
          </div>

          <div className="space-y-4">
            {topProperties.map((prop) => (
              <div key={prop.id} className="flex gap-3 items-center group">
                <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-rose-600 rounded-xl shrink-0 flex items-center justify-center text-white text-xs font-black shadow-md shadow-amber-500/10">
                  {prop.title.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-rose-500 transition-colors">
                    {prop.title}
                  </h4>
                  <span className="text-[10px] text-zinc-400 block">{prop.location} • {prop.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 justify-end">
                    ★ {prop.rating}
                  </span>
                  <span className="text-[9px] text-zinc-400">{prop.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Schedule & Tasks Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Booking Table */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm lg:col-span-2 space-y-4 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">Recent Booking Schedules</h3>
              <p className="text-xs text-zinc-400">Incoming guest reservations and payments</p>
            </div>
            <button className="text-xs text-rose-500 font-semibold hover:underline">View All Bookings</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-medium">
                  <th className="py-2.5">ID</th>
                  <th className="py-2.5">Guest</th>
                  <th className="py-2.5">Property</th>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Price</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50 font-medium">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="text-zinc-700 dark:text-zinc-300">
                    <td className="py-3 text-zinc-400 font-mono">{b.id}</td>
                    <td className="py-3 text-zinc-900 dark:text-zinc-100">{b.customer}</td>
                    <td className="py-3 truncate max-w-[120px]">{b.property}</td>
                    <td className="py-3 text-zinc-400">{b.date}</td>
                    <td className="py-3 font-semibold text-zinc-900 dark:text-zinc-100">{b.amount}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : b.status === "Pending"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Check list */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4 dark:bg-zinc-900 dark:border-zinc-800">
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">Tasks & Operations</h3>
            <p className="text-xs text-zinc-400">Daily routine checks for administrators</p>
          </div>

          <div className="space-y-3">
            {[
              { id: 1, text: "Approve pending agent applications (4)", completed: false },
              { id: 2, text: "Moderate user complaints under Reviews", completed: false },
              { id: 3, text: "Verify payout batch for early May cycle", completed: true },
              { id: 4, text: "Run automated favorites DB backup", completed: true },
            ].map((task) => (
              <label key={task.id} className="flex gap-3 items-start cursor-pointer text-xs group">
                <input
                  type="checkbox"
                  defaultChecked={task.completed}
                  className="mt-0.5 accent-rose-500 rounded cursor-pointer"
                />
                <span className={`font-medium ${task.completed ? "line-through text-zinc-400" : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"}`}>
                  {task.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
