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
    <tr className="bg-white text-zinc-700 hover:bg-zinc-50 transition-colors duration-200">
      {/* Guest Info */}
      <td className="p-4">
        <span className="font-bold text-zinc-900 block">
          {booking.user?.full_name ?? "—"}
        </span>

        <span className="text-[10px] text-zinc-500 font-mono block mt-1">
          {formatBookingId(booking.id)} • {booking.user?.email ?? "—"}
        </span>
      </td>

      {/* Property */}
      <td className="p-4 truncate max-w-[150px] font-bold text-zinc-800">
        {booking.property?.title ?? "—"}
      </td>

      {/* Stay Dates */}
      <td className="p-4 text-zinc-600">
        <div className="flex flex-col gap-1">
          <span>
            In:{" "}
            <strong className="text-zinc-800 font-semibold">
              {formatDate(booking.check_in)}
            </strong>
          </span>

          <span>
            Out:{" "}
            <strong className="text-zinc-800 font-semibold">
              {formatDate(booking.check_out)}
            </strong>
          </span>
        </div>
      </td>

      {/* Price */}
      <td className="p-4 font-extrabold text-zinc-900 text-sm">
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