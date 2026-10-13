import { BookingStatus } from "@/src/types/booking";
import { formatStatus } from "@/src/utils/bookingFormatters";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export default function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {
  const label = formatStatus(status);

  const styles = {
    Confirmed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Cancelled: "bg-rose-50 text-rose-700",
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${styles[label]}`}
    >
      {label}
    </span>
  );
}