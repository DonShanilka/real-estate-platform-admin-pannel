"use client";

interface PaymentToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  total: number;
}

export default function PaymentToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  total,
}: PaymentToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 
    bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-base font-bold text-zinc-900">
          Payment Transactions
        </h2>

        <p className="mt-1 text-xs text-zinc-500">
          Search, filter and manage payment records.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            ⌕
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search ID, booking, user, transaction..."
            className="w-full rounded-lg border border-zinc-200 bg-white 
            py-2.5 pl-9 pr-3 text-xs text-zinc-800 outline-none transition 
            placeholder:text-zinc-400 focus:border-zinc-500 sm:w-72"
          />
        </div>

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2.5 
          text-xs font-medium text-zinc-700 outline-none focus:border-zinc-500"
          aria-label="Filter by payment status"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="successful">Successful</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      <div className="text-xs text-zinc-500">
        <span className="font-bold text-zinc-900">{total}</span> records
      </div>
    </div>
  );
}
