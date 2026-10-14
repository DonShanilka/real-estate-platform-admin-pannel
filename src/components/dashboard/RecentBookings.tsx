"use client";

import React from "react";

import type { Booking } from "@/src/redux/features/dashboard/dashboardTypes";

interface RecentBookingsProps {
  bookings: Booking[];
}

function getCustomerName(booking: Booking): string {
  const user = booking.user;

  if (!user) {
    return booking.user_id ? `User #${booking.user_id}` : "Customer";
  }

  if (user.full_name) return user.full_name;

  if (user.name) return user.name;

  return (
    [user.first_name, user.last_name].filter(Boolean).join(" ") ||
    `User #${user.id ?? booking.user_id ?? ""}`
  );
}

function getPropertyName(booking: Booking): string {
  return (
    booking.property?.title ??
    (booking.property_id
      ? `Property #${booking.property_id}`
      : "Property unavailable")
  );
}

export default function RecentBookings({ bookings }: RecentBookingsProps) {
  const recentBookings = [...bookings]
    .sort((a, b) => {
      const dateA = new Date(a.created_at ?? 0).getTime();
      const dateB = new Date(b.created_at ?? 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-bold text-black">Recent Bookings</h3>

        <p className="mt-1 text-xs text-gray-500">
          Latest booking activity across the platform
        </p>
      </div>

      {recentBookings.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No bookings available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                <th className="whitespace-nowrap py-3 pr-4">Booking</th>

                <th className="whitespace-nowrap py-3 pr-4">Customer</th>

                <th className="whitespace-nowrap py-3 pr-4">Property</th>

                <th className="whitespace-nowrap py-3 pr-4">Date</th>

                <th className="whitespace-nowrap py-3 text-right">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {recentBookings.map((booking) => {
                const status = booking.status ?? "Unknown";

                const isPending = status.toUpperCase() === "PENDING";

                const isCancelled = status.toUpperCase() === "CANCELLED";

                return (
                  <tr
                    key={booking.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap py-4 pr-4 font-mono text-gray-500">
                      B-{booking.id}
                    </td>

                    <td className="whitespace-nowrap py-4 pr-4 font-semibold text-black">
                      {getCustomerName(booking)}
                    </td>

                    <td className="max-w-44 truncate py-4 pr-4 text-gray-600">
                      {getPropertyName(booking)}
                    </td>

                    <td className="whitespace-nowrap py-4 pr-4 text-gray-500">
                      {booking.created_at
                        ? new Date(booking.created_at).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="whitespace-nowrap py-4 text-right">
                      <span
                        className={`inline-block rounded-md border px-2 py-1 text-[10px] font-semibold ${
                          isPending
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : isCancelled
                              ? "border-red-200 bg-red-50 text-red-700"
                              : "border-gray-200 bg-gray-50 text-gray-700"
                        }`}
                      >
                        {status.replaceAll("_", " ")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
