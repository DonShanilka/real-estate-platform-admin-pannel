"use client";

import { useEffect, useState, type FormEvent } from "react";

import type {
  Payment,
  PaymentCreate,
  PaymentMethod,
  PaymentStatus,
} from "@/src/types/paymentTypes";

interface PaymentFormModalProps {
  open: boolean;
  payment: Payment | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (data: PaymentCreate, paymentId?: number) => Promise<void>;
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500";

export default function PaymentFormModal({
  open,
  payment,
  saving,
  onClose,
  onSubmit,
}: PaymentFormModalProps) {
  const [userId, setUserId] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("LKR");
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [status, setStatus] = useState<PaymentStatus>("pending");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    setUserId(payment ? String(payment.user_id) : "");
    setBookingId(payment ? String(payment.booking_id) : "");
    setAmount(payment ? String(payment.amount) : "");
    setCurrency(payment?.currency || "LKR");
    setMethod((payment?.payment_method as PaymentMethod) || "card");
    setStatus((payment?.status as PaymentStatus) || "pending");
    setTransactionId(payment?.transaction_id || "");
    setError("");
  }, [open, payment]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const numericAmount = Number(amount);

    if (!payment && (!userId || !bookingId)) {
      setError("User ID and Booking ID are required.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Enter a valid amount greater than zero.");
      return;
    }

    if (!/^[A-Za-z]{3}$/.test(currency)) {
      setError("Currency must be a three-letter code, such as LKR.");
      return;
    }

    const data: PaymentCreate = {
      user_id: Number(userId),
      booking_id: Number(bookingId),
      amount: numericAmount,
      currency: currency.toUpperCase(),
      payment_method: method,
      status,
      transaction_id: transactionId.trim() || null,
    };

    try {
      await onSubmit(data, payment?.id);
    } catch {
      setError("Could not save the payment. Please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        className="my-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-zinc-100 p-6">
          <div>
            <h2
              id="payment-modal-title"
              className="text-lg font-bold text-zinc-900"
            >
              {payment ? "Update Payment" : "Add Payment"}
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              {payment
                ? `Update payment PAY-${String(payment.id).padStart(4, "0")}.`
                : "Create a payment record for an existing booking."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close modal"
            className="rounded-lg px-2 py-1 text-lg text-zinc-400 hover:bg-zinc-100
             hover:text-zinc-900 disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            <label className="text-xs font-semibold text-zinc-700">
              User ID
              <input
                type="number"
                min="1"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                disabled={Boolean(payment)}
                required
                className={inputClass}
                placeholder="e.g. 5"
              />
            </label>

            <label className="text-xs font-semibold text-zinc-700">
              Booking ID
              <input
                type="number"
                min="1"
                value={bookingId}
                onChange={(event) => setBookingId(event.target.value)}
                disabled={Boolean(payment)}
                required
                className={inputClass}
                placeholder="e.g. 4"
              />
            </label>

            <label className="text-xs font-semibold text-zinc-700">
              Amount
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
                className={inputClass}
                placeholder="Enter amount"
              />
            </label>

            <label className="text-xs font-semibold text-zinc-700">
              Currency
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className={inputClass}
              >
                <option value="LKR">LKR - Sri Lankan Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </label>

            <label className="text-xs font-semibold text-zinc-700">
              Payment Method
              <select
                value={method}
                onChange={(event) =>
                  setMethod(event.target.value as PaymentMethod)
                }
                className={inputClass}
              >
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </label>

            <label className="text-xs font-semibold text-zinc-700">
              Payment Status
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as PaymentStatus)
                }
                className={inputClass}
              >
                <option value="pending">Pending</option>
                <option value="successful">Successful</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </label>

            <label className="text-xs font-semibold text-zinc-700 sm:col-span-2">
              Transaction ID
              <input
                type="text"
                maxLength={255}
                value={transactionId}
                onChange={(event) => setTransactionId(event.target.value)}
                className={inputClass}
                placeholder="Optional transaction reference"
              />
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-rose-200 bg-rose-50 
                p-3 text-xs text-rose-700 sm:col-span-2"
              >
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-zinc-100 
          bg-zinc-50/70 p-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-xs 
              font-semibold text-zinc-700 hover:bg-zinc-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-zinc-900 px-5 py-2.5 text-xs font-semibold 
              text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : payment
                  ? "Update Payment"
                  : "Create Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
