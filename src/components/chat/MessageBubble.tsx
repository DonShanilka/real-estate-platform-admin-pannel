interface Props {
  message: string;
  isMine: boolean;
  time: string;
}

export default function MessageBubble({ message, isMine, time }: Props) {
  return (
    // isMine = I sent it  → right side (justify-end)
    // !isMine = they sent → left side  (justify-start)
    <div className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-sm lg:max-w-md px-4 py-3 text-sm shadow-sm ${
          isMine
            ? "bg-rose-600 text-white rounded-2xl rounded-br-none"
            : "bg-white dark:bg-zinc-800 border dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-2xl rounded-bl-none"
        }`}
      >
        <p className="leading-relaxed break-words">{message}</p>
        <span
          className={`text-[10px] block text-right mt-1 ${
            isMine ? "text-rose-200" : "text-zinc-400"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  );
}