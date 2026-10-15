"use client";

import type { Payment } from "@/src/types/paymentTypes";

interface PaymentSummaryCardsProps {
  payments: Payment[];
}

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString()}`;
  }
}

export default function PaymentSummaryCards({
  payments,
}: PaymentSummaryCardsProps) {
  const successfulPayments = payments.filter(
    (payment) => payment.status.toLowerCase() === "successful",
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status.toLowerCase() === "pending",
  );

  const failedPayments = payments.filter(
    (payment) => payment.status.toLowerCase() === "failed",
  );

  const totalSuccessfulAmount = successfulPayments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0,
  );

  const currency =
    payments.find((payment) => payment.currency)?.currency || "LKR";

  const cards = [
    {
      label: "Total Payment Records",
      value: payments.length.toLocaleString(),
      description: "Records returned by the API",
    },
    {
      label: "Successful Payments",
      value: successfulPayments.length.toLocaleString(),
      description: "Confirmed status records",
    },
    {
      label: "Pending Payments",
      value: pendingPayments.length.toLocaleString(),
      description: "Awaiting confirmation",
    },
    {
      label: "Successful Payment Value",
      value: formatMoney(totalSuccessfulAmount, currency),
      description: "Based on successful records",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm 
          transition hover:border-zinc-300 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {card.label}
          </p>

          <p className="mt-3 break-words text-2xl font-extrabold text-zinc-950">
            {card.value}
          </p>

          <p className="mt-2 text-[11px] text-zinc-500">{card.description}</p>

          {index === 2 && failedPayments.length > 0 && (
            <p className="mt-2 text-[11px] font-semibold text-rose-600">
              {failedPayments.length} failed payment record(s)
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
