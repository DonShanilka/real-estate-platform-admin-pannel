"use client";

import React, { useState } from "react";
import { Icons } from "@/src/components/Icons";

interface Booking {
  id: string;
  guest: string;
  guestEmail: string;
  property: string;
  checkIn: string;
  checkOut: string;
  totalPrice: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

const initialBookings: Booking[] = [
  { id: "BK-8001", guest: "Sophia Martinez", guestEmail: "sophia.mtz@gmail.com", property: "Oceanfront Glass Penthouse", checkIn: "2026-06-01", checkOut: "2026-06-07", totalPrice: "$12,400", status: "Confirmed" },
  { id: "BK-8002", guest: "Michael Chen", guestEmail: "m.chen@techcorp.com", property: "Modernist Forest Oasis Villa", checkIn: "2026-05-25", checkOut: "2026-05-28", totalPrice: "$2,940", status: "Pending" },
  { id: "BK-8003", guest: "Emma Watson", guestEmail: "emma@actress.org", property: "Luxury Downtown Highrise Apartment", checkIn: "2026-06-15", checkOut: "2026-06-20", totalPrice: "$1,900", status: "Confirmed" },
  { id: "BK-8004", guest: "James Anderson", guestEmail: "james.anderson@yahoo.com", property: "Sunset Skyline Penthouse", checkIn: "2026-06-02", checkOut: "2026-06-05", totalPrice: "$1,350", status: "Cancelled" },
  { id: "BK-8005", guest: "Olivia Taylor", guestEmail: "olivia.t@gmail.com", property: "Serene Lakefront Eco-Villa", checkIn: "2026-07-01", checkOut: "2026-07-10", totalPrice: "$21,600", status: "Pending" },
];

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Confirmed" | "Pending" | "Cancelled">("All");

  const updateBookingStatus = (id: string, newStatus: "Confirmed" | "Cancelled") => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Booking Filter Headers */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex gap-2">
          {(["All", "Confirmed", "Pending", "Cancelled"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === status
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {status} Bookings
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guest or property title..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-zinc-200 text-zinc-800 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
          />
        </div>
      </div>

      {/* Bookings Table list */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Guest Info</th>
                <th className="p-4">Property</th>
                <th className="p-4">Stay Dates</th>
                <th className="p-4">Price Yield</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Reservation Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50 font-medium">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-all">
                    {/* Guest Name & Email */}
                    <td className="p-4">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{b.guest}</span>
                      <span className="text-[10px] text-zinc-400 font-mono block">{b.id} • {b.guestEmail}</span>
                    </td>

                    {/* Property title */}
                    <td className="p-4 truncate max-w-[150px] font-bold text-zinc-900 dark:text-zinc-100">
                      {b.property}
                    </td>

                    {/* Dates checkin checkout */}
                    <td className="p-4 text-zinc-500 dark:text-zinc-400">
                      <div className="flex flex-col">
                        <span>In: <strong className="text-zinc-700 dark:text-zinc-300">{b.checkIn}</strong></span>
                        <span>Out: <strong className="text-zinc-700 dark:text-zinc-300">{b.checkOut}</strong></span>
                      </div>
                    </td>

                    <td className="p-4 font-extrabold text-zinc-900 dark:text-zinc-100 text-sm">
                      {b.totalPrice}
                    </td>

                    {/* Status badges */}
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          b.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : b.status === "Pending"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                            : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    {/* Booking moderation options */}
                    <td className="p-4 text-right">
                      {b.status === "Pending" ? (
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => updateBookingStatus(b.id, "Confirmed")}
                            className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:opacity-90"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, "Cancelled")}
                            className="px-2.5 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-lg hover:opacity-90"
                          >
                            Reject
                          </button>
                        </div>
                      ) : b.status === "Confirmed" ? (
                        <button
                          onClick={() => updateBookingStatus(b.id, "Cancelled")}
                          className="px-2.5 py-1 text-rose-600 border border-rose-200 hover:bg-rose-50 dark:border-rose-950/30 dark:hover:bg-rose-950/20 text-[10px] font-bold rounded-lg"
                        >
                          Cancel Booking
                        </button>
                      ) : (
                        <span className="text-[10px] text-zinc-400">Archived Reservation</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-zinc-400 font-semibold">
                    No bookings found matching selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
