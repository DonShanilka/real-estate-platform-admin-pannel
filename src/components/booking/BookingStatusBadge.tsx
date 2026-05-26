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
    Confirmed:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400",
    Pending:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400",
    Cancelled:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400",
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${styles[label]}`}
    >
      {label}
    </span>
  );
}
