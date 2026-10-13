import { Booking, BookingStatus } from "@/src/types/booking";
import BookingTableRow from "./BookingTableRow";

interface BookingTableProps {
  bookings: Booking[];
  onUpdateStatus: (id: number, status: BookingStatus) => void;
}

export default function BookingTable({
  bookings,
  onUpdateStatus,
}: BookingTableProps) {
  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-200/70 bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Guest Info</th>
              <th className="p-4">Property</th>
              <th className="p-4">Stay Dates</th>
              <th className="p-4">Price Yield</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Reservation Controls</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100 font-medium">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingTableRow
                  key={booking.id}
                  booking={booking}
                  onUpdateStatus={onUpdateStatus}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-12 text-center text-zinc-500 font-semibold"
                >
                  No bookings found matching selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}