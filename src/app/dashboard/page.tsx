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
    },
    {
      label: "Active Bookings",
      value: "382",
      change: "+8.2%",
      isPositive: true,
      icon: Icons.Bookings,
    },
    {
      label: "Monthly Revenue",
      value: "$45,280",
      change: "+18.7%",
      isPositive: true,
      icon: Icons.Revenue,
    },
    {
      label: "Open Inquiries",
      value: "29",
      change: "-4.5%",
      isPositive: false,
      icon: Icons.Chat,
    },
  ];

  const recentBookings = [
    {
      id: "B-9201",
      customer: "Sophia Martinez",
      property: "Sunset Beach Villa",
      date: "May 20, 2026",
      amount: "$1,200",
      status: "Confirmed",
    },
    {
      id: "B-9202",
      customer: "Michael Chen",
      property: "Luxury Downtown Loft",
      date: "May 19, 2026",
      amount: "$850",
      status: "Pending",
    },
    {
      id: "B-9203",
      customer: "Emma Watson",
      property: "Modern Hillside Manor",
      date: "May 18, 2026",
      amount: "$2,400",
      status: "Confirmed",
    },
    {
      id: "B-9204",
      customer: "James Anderson",
      property: "Cozy Lakefront Cabin",
      date: "May 18, 2026",
      amount: "$620",
      status: "Cancelled",
    },
  ];

  const topProperties = [
    {
      id: 1,
      title: "Grand Oceanfront Penthouse",
      location: "Miami, FL",
      price: "$1,850,000",
      rating: 4.9,
      views: 1842,
    },
    {
      id: 2,
      title: "Modernist Forest Sanctuary",
      location: "Portland, OR",
      price: "$980,000",
      rating: 4.8,
      views: 1422,
    },
    {
      id: 3,
      title: "Chic Minimalist Townhouse",
      location: "Austin, TX",
      price: "$720,000",
      rating: 4.7,
      views: 955,
    },
  ];

  const tasks = [
    {
      id: 1,
      text: "Approve pending agent applications (4)",
      completed: false,
    },
    {
      id: 2,
      text: "Moderate user complaints under Reviews",
      completed: false,
    },
    {
      id: 3,
      text: "Verify payout batch for early May cycle",
      completed: true,
    },
    {
      id: 4,
      text: "Run automated favorites DB backup",
      completed: true,
    },
  ];

  return (
    <div className="min-h-full space-y-8 bg-white text-black animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Welcome Banner */}
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">
            Welcome back, Admin Panel Console!
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Here is a quick overview of what is happening across the platform
            today.
          </p>
        </div>

        <div className="flex items-center gap-1 self-start rounded-lg border border-gray-200 bg-white p-1 sm:self-auto">
          {["This Week", "This Month", "Yearly"].map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setSelectedRange(range)}
              className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                selectedRange === range
                  ? "bg-black text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;

          return (
            <div
              key={stat.label}
              className="group relative flex items-start justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {stat.label}
                </span>

                <h3 className="text-3xl font-extrabold text-black">
                  {stat.value}
                </h3>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold ${
                      stat.isPositive
                        ? "bg-gray-100 text-black"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {stat.isPositive ? (
                      <Icons.ArrowUp size={10} />
                    ) : (
                      <Icons.ArrowDown size={10} />
                    )}

                    {stat.change}
                  </span>

                  <span className="text-[10px] text-gray-400">
                    vs prev month
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-black transition-colors group-hover:bg-gray-100">
                <IconComponent size={22} />
              </div>
            </div>
          );
        })}
      </section>

      {/* Revenue Chart and Top Properties */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-black">
                Revenue Stream Chart
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Showing platform commission split & bookings yield
              </p>
            </div>

            <span className="shrink-0 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-black">
              Live Sync
            </span>
          </div>

          <div className="relative h-64 w-full pt-4">
            <svg
              className="h-full w-full"
              viewBox="0 0 500 200"
              preserveAspectRatio="none"
              role="img"
              aria-label="Revenue stream chart"
            >
              <defs>
                <linearGradient
                  id="revenueAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>

                <linearGradient
                  id="revenueLineGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="100%" stopColor="#737373" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1="0"
                y1="50"
                x2="500"
                y2="50"
                stroke="#e5e7eb"
                strokeWidth="1"
              />

              <line
                x1="0"
                y1="100"
                x2="500"
                y2="100"
                stroke="#e5e7eb"
                strokeWidth="1"
              />

              <line
                x1="0"
                y1="150"
                x2="500"
                y2="150"
                stroke="#e5e7eb"
                strokeWidth="1"
              />

              {/* Area */}
              <path
                d="M 0 160 Q 100 120 180 140 T 300 70 T 400 90 T 500 40 L 500 200 L 0 200 Z"
                fill="url(#revenueAreaGradient)"
              />

              {/* Revenue Line */}
              <path
                d="M 0 160 Q 100 120 180 140 T 300 70 T 400 90 T 500 40"
                fill="none"
                stroke="url(#revenueLineGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute bottom-0 left-0 flex w-full justify-between px-2 text-[10px] font-medium text-gray-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
            </div>
          </div>
        </div>

        {/* Top Viewed Properties */}
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-black">
              Top Viewed Properties
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Highly engaging property listings this week
            </p>
          </div>

          <div className="space-y-4">
            {topProperties.map((property) => (
              <div
                key={property.id}
                className="group flex items-center gap-3"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xs font-black text-black">
                  {property.title.substring(0, 2).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-semibold text-black transition-colors group-hover:underline">
                    {property.title}
                  </h4>

                  <span className="mt-1 block text-[10px] text-gray-500">
                    {property.location} • {property.price}
                  </span>
                </div>

                <div className="text-right">
                  <span className="flex items-center justify-end gap-0.5 text-[10px] font-bold text-black">
                    ★ {property.rating}
                  </span>

                  <span className="text-[9px] text-gray-400">
                    {property.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Bookings and Tasks */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Bookings Table */}
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-black">
                Recent Booking Schedules
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Incoming guest reservations and payments
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-gray-100"
            >
              View All Bookings
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 font-medium text-gray-500">
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 pr-4">Guest</th>
                  <th className="py-3 pr-4">Property</th>
                  <th className="py-3 pr-4">Date</th>
                  <th className="py-3 pr-4">Price</th>
                  <th className="py-3 text-right">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap py-3 pr-4 font-mono text-gray-400">
                      {booking.id}
                    </td>

                    <td className="whitespace-nowrap py-3 pr-4 font-semibold text-black">
                      {booking.customer}
                    </td>

                    <td className="max-w-[120px] truncate py-3 pr-4">
                      {booking.property}
                    </td>

                    <td className="whitespace-nowrap py-3 pr-4 text-gray-500">
                      {booking.date}
                    </td>

                    <td className="whitespace-nowrap py-3 pr-4 font-semibold text-black">
                      {booking.amount}
                    </td>

                    <td className="whitespace-nowrap py-3 text-right">
                      <span
                        className={`inline-block rounded-md border px-2 py-1 text-[10px] font-semibold ${
                          booking.status === "Confirmed"
                            ? "border-gray-300 bg-gray-100 text-black"
                            : booking.status === "Pending"
                              ? "border-gray-200 bg-white text-gray-600"
                              : "border-gray-200 bg-gray-50 text-gray-400"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tasks and Operations */}
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-black">
              Tasks & Operations
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Daily routine checks for administrators
            </p>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <label
                key={task.id}
                className="group flex cursor-pointer items-start gap-3 text-xs"
              >
                <input
                  type="checkbox"
                  defaultChecked={task.completed}
                  className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 accent-black"
                />

                <span
                  className={`font-medium transition-colors ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-700 group-hover:text-black"
                  }`}
                >
                  {task.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}