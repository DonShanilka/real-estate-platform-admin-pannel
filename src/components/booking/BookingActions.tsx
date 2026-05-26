"use client";

import { BookingStatus } from "@/src/types/booking";
import { formatStatus } from "@/src/utils/bookingFormatters";

interface BookingActionsProps {
  bookingId: number;
  status: BookingStatus;
  onUpdateStatus: (id: number, status: BookingStatus) => void;
}

export default function BookingActions({
  bookingId,
  status,
  onUpdateStatus,
}: BookingActionsProps) {
  const label = formatStatus(status);

  if (label === "Pending") {
    return (
      <div className="flex gap-1.5 justify-end">
        <button
          onClick={() => onUpdateStatus(bookingId, "confirmed")}
          className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:opacity-90"
        >
          Approve
        </button>
        <button
          onClick={() => onUpdateStatus(bookingId, "cancelled")}
          className="px-2.5 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-lg hover:opacity-90"
        >
          Reject
        </button>
      </div>
    );
  }

  if (label === "Confirmed") {
    return (
      <button
        onClick={() => onUpdateStatus(bookingId, "cancelled")}
        className="px-2.5 py-1 text-rose-600 border border-rose-200 hover:bg-rose-50 dark:border-rose-950/30 dark:hover:bg-rose-950/20 text-[10px] font-bold rounded-lg"
      >
        Cancel Booking
      </button>
    );
  }

  return (
    <span className="text-[10px] text-zinc-400">Archived Reservation</span>
  );
}
