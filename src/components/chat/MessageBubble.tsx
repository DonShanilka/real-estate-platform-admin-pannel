interface Props {
  message: string;
  isMine: boolean;
  time: string;
}

export default function MessageBubble({
  message,
  isMine,
  time,
}: Props) {
  return (
    <div
      className={`flex ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-md
          px-4
          py-3
          rounded-2xl
          shadow-sm
          text-sm
          ${
            isMine
              ? "bg-zinc-950 text-white rounded-tr-none"
              : "bg-white border border-zinc-200 rounded-tl-none dark:bg-zinc-800 dark:border-zinc-700"
          }
        `}
      >
        <p>{message}</p>

        <span
          className={`
            text-[10px]
            mt-1
            block
            text-right
            ${
              isMine
                ? "text-zinc-400"
                : "text-zinc-500"
            }
          `}
        >
          {time}
        </span>
      </div>
    </div>
  );
}