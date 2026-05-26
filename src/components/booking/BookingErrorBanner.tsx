"use client";

interface BookingErrorBannerProps {
  error: string;
  onDismiss: () => void;
}

export default function BookingErrorBanner({
  error,
  onDismiss,
}: BookingErrorBannerProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl dark:bg-rose-950/20 dark:border-rose-900/30">
      <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
        {error}
      </p>
      <button
        onClick={onDismiss}
        className="text-rose-400 hover:text-rose-600 dark:text-rose-500 dark:hover:text-rose-300 transition-colors text-xs font-bold shrink-0"
      >
        Dismiss
      </button>
    </div>
  );
}