import { Booking, BookingStatus } from "@/src/types/booking";
import {
  formatDate,
  formatPrice,
  formatBookingId,
} from "@/src/utils/bookingFormatters";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingActions from "./BookingActions";

interface BookingTableRowProps {
  booking: Booking;
  onUpdateStatus: (id: number, status: BookingStatus) => void;
}

export default function BookingTableRow({
  booking,
  onUpdateStatus,
}: BookingTableRowProps) {
  return (
    <tr className="text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-all">
      {/* Guest Info */}
      <td className="p-4">
        <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
          {booking.user?.full_name ?? "—"}
        </span>
        <span className="text-[10px] text-zinc-400 font-mono block">
          {formatBookingId(booking.id)} • {booking.user?.email ?? "—"}
        </span>
      </td>

      {/* Property */}
      <td className="p-4 truncate max-w-[150px] font-bold text-zinc-900 dark:text-zinc-100">
        {booking.property?.title ?? "—"}
      </td>

      {/* Stay Dates */}
      <td className="p-4 text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-col">
          <span>
            In:{" "}
            <strong className="text-zinc-700 dark:text-zinc-300">
              {formatDate(booking.check_in)}
            </strong>
          </span>
          <span>
            Out:{" "}
            <strong className="text-zinc-700 dark:text-zinc-300">
              {formatDate(booking.check_out)}
            </strong>
          </span>
        </div>
      </td>

      {/* Price */}
      <td className="p-4 font-extrabold text-zinc-900 dark:text-zinc-100 text-sm">
        {formatPrice(booking.total_price)}
      </td>

      {/* Status Badge */}
      <td className="p-4">
        <BookingStatusBadge status={booking.status} />
      </td>

      {/* Actions */}
      <td className="p-4 text-right">
        <BookingActions
          bookingId={booking.id}
          status={booking.status}
          onUpdateStatus={onUpdateStatus}
        />
      </td>
    </tr>
  );
}
