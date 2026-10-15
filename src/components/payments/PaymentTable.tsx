"use client";

import type { Payment } from "@/src/types/paymentTypes";

import PaymentStatusBadge from "./PaymentStatusBadge";

interface PaymentTableProps {
  payments: Payment[];
  onEdit: (payment: Payment) => void;
  onDelete: (payment: Payment) => void;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-LK", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(amount: number | string, currency: string) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return `${currency} —`;
  }

  return `${currency} ${value.toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function PaymentTable({
  payments,
  onEdit,
  onDelete,
}: PaymentTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold
             uppercase tracking-wider text-zinc-500">
              <th className="whitespace-nowrap px-5 py-4">Payment</th>
              <th className="whitespace-nowrap px-5 py-4">User / Booking</th>
              <th className="whitespace-nowrap px-5 py-4">Method</th>
              <th className="whitespace-nowrap px-5 py-4">Date</th>
              <th className="whitespace-nowrap px-5 py-4 text-right">Amount</th>
              <th className="whitespace-nowrap px-5 py-4">Status</th>
              <th className="whitespace-nowrap px-5 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="transition-colors hover:bg-zinc-50"
              >
                <td className="whitespace-nowrap px-5 py-4">
                  <p className="font-bold text-zinc-900">
                    PAY-{String(payment.id).padStart(4, "0")}
                  </p>

                  <p className="mt-1 max-w-44 truncate font-mono text-[10px] text-zinc-500">
                    {payment.transaction_id || "No transaction reference"}
                  </p>
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <p className="font-semibold text-zinc-900">
                    User #{payment.user_id}
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-500">
                    Booking #{payment.booking_id}
                  </p>
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <span className="capitalize text-zinc-700">
                    {payment.payment_method.replaceAll("_", " ")}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-zinc-500">
                  {formatDate(payment.created_at)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right font-bold text-zinc-900">
                  {formatAmount(payment.amount, payment.currency)}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <PaymentStatusBadge status={payment.status} />
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(payment)}
                      className="rounded-md border border-zinc-200 px-3 py-1.5 text-[10px] 
                      font-bold text-zinc-700 transition hover:bg-zinc-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(payment)}
                      className="rounded-md border border-rose-200 px-3 py-1.5 text-[10px]
                       font-bold text-rose-600 transition hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-xs text-zinc-500"
                >
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-zinc-100 px-5 py-3 text-[10px] text-zinc-500">
        Showing {payments.length} payment record(s)
      </div>
    </div>
  );
}
