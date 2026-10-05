interface Props {
  name: string;
  online?: boolean;
  onBack?: () => void;
}

export default function ChatHeader({ name, online, onBack }: Props) {
  return (
    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to conversations"
            className="-ml-1 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-linear-to-r from-rose-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
            {name.substring(0, 2).toUpperCase()}
          </div>

          {online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-zinc-900" />
          )}
        </div>

        <div>
          <h3 className="font-semibold text-sm">{name}</h3>
          <span className="text-xs text-zinc-500">{online ? "Online" : "Offline"}</span>
        </div>
      </div>
    </div>
  );
}