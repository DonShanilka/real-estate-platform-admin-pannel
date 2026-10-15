"use client";

export default function PaymentsLoading() {
  return (
    <div className="space-y-5" aria-label="Loading payments">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5"
          >
            <div className="h-3 w-32 rounded bg-zinc-200" />
            <div className="mt-4 h-8 w-36 rounded bg-zinc-200" />
            <div className="mt-3 h-3 w-40 rounded bg-zinc-100" />
          </div>
        ))}
      </div>

      <div className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="h-5 w-48 rounded bg-zinc-200" />

        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="mt-6 h-10 rounded-lg bg-zinc-100" />
        ))}
      </div>
    </div>
  );
}
