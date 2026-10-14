"use client";

import React from "react";

import { Icons } from "@/src/components/layout/Icons";

import type {
  Booking,
  Favorite,
  Property,
} from "@/src/redux/features/dashboard/dashboardTypes";

interface DashboardStatsProps {
  properties: Property[];
  bookings: Booking[];
  favorites: Favorite[];
}

export default function DashboardStats({
  properties,
  bookings,
  favorites,
}: DashboardStatsProps) {
  const activeBookings = bookings.filter((booking) => {
    const status = booking.status?.toUpperCase();

    return (
      status !== "CANCELLED" &&
      status !== "REJECTED" &&
      status !== "COMPLETED" &&
      status !== "DELIVERED"
    );
  }).length;

  const stats = [
    {
      label: "Total Properties",
      value: properties.length.toLocaleString(),
      icon: Icons.Properties,
    },
    {
      label: "Active Bookings",
      value: activeBookings.toLocaleString(),
      icon: Icons.Bookings,
    },
    {
      label: "Total Favorites",
      value: favorites.length.toLocaleString(),
      icon: Icons.Properties,
    },
    {
      label: "Pending Bookings",
      value: bookings
        .filter((booking) => booking.status?.toUpperCase() === "PENDING")
        .length.toLocaleString(),
      icon: Icons.Bookings,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="group flex items-start justify-between rounded-2xl border 
            border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {stat.label}
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-black">
                {stat.value}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Current platform data
              </p>
            </div>

            <div
              className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-black 
            transition group-hover:bg-gray-100"
            >
              <Icon size={21} />
            </div>
          </article>
        );
      })}
    </section>
  );
}
