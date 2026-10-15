"use client";

interface PaymentsHeaderProps {
  onAddPayment: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export default function PaymentsHeader({
  onAddPayment,
  onRefresh,
  refreshing,
}: PaymentsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-lg text-white">
            $
          </div>

          <div>
            <h1 className="text-xl font-bold text-zinc-900">
              Payment Management
            </h1>

            <p className="mt-1 text-xs text-zinc-500">
              Manage payment records, transactions and payment statuses.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="rounded-lg border border-zinc-200 px-4 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>

        <button
          type="button"
          onClick={onAddPayment}
          className="rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-700"
        >
          + Add Payment
        </button>
      </div>
    </div>
  );
}
