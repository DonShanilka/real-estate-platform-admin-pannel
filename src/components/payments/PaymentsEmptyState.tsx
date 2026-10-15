"use client";

interface PaymentsEmptyStateProps {
  search: string;
  onClear: () => void;
  onAdd: () => void;
}

export default function PaymentsEmptyState({
  search,
  onClear,
  onAdd,
}: PaymentsEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl text-zinc-500">
        $
      </div>

      <h3 className="mt-4 text-base font-bold text-zinc-900">
        No payments found
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-zinc-500">
        {search
          ? "No payment records match your search. Try another payment ID, booking ID, user ID or transaction reference."
          : "There are no payment records to display yet."}
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {search && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-zinc-200 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            Clear Search
          </button>
        )}

        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-zinc-700"
        >
          + Add Payment
        </button>
      </div>
    </div>
  );
}
