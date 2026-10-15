"use client";

import type { Payment } from "@/src/types/paymentTypes";

interface DeletePaymentModalProps {
  payment: Payment | null;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeletePaymentModal({
  payment,
  deleting,
  onCancel,
  onConfirm,
}: DeletePaymentModalProps) {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-payment-title"
        className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-xl text-rose-600">
          !
        </div>

        <h2
          id="delete-payment-title"
          className="mt-4 text-lg font-bold text-zinc-900"
        >
          Delete Payment?
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Are you sure you want to delete payment{" "}
          <span className="font-bold text-zinc-900">
            PAY-{String(payment.id).padStart(4, "0")}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-lg border border-zinc-200 px-4 py-2.5 text-xs font-semibold
             text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={deleting}
            className="rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-semibold 
            text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}