import type { PaymentStatus } from "@/src/types/paymentTypes";

interface PaymentStatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  successful: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  failed: "bg-rose-50 text-rose-700 ring-rose-600/20",
  refunded: "bg-blue-50 text-blue-700 ring-blue-600/20",
};

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold capitalize ring-1 ring-inset ${
        statusStyles[normalizedStatus] ??
        "bg-zinc-100 text-zinc-700 ring-zinc-300"
      }`}
    >
      {normalizedStatus}
    </span>
  );
}
