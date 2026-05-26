export default function BookingLoadingSkeleton() {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Guest Info</th>
              <th className="p-4">Property</th>
              <th className="p-4">Stay Dates</th>
              <th className="p-4">Price Yield</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Reservation Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="p-4">
                  <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-32 mb-1.5" />
                  <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded w-48" />
                </td>
                <td className="p-4">
                  <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-36" />
                </td>
                <td className="p-4">
                  <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-24 mb-1.5" />
                  <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-24" />
                </td>
                <td className="p-4">
                  <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-16" />
                </td>
                <td className="p-4">
                  <div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded w-16" />
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <div className="h-6 bg-zinc-100 dark:bg-zinc-800 rounded w-16" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}