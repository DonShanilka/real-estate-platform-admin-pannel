interface Props {
  message: string;
  isMine: boolean;
  time: string;
}

export default function MessageBubble({ message, isMine, time }: Props) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-sm lg:max-w-md px-4 py-3 rounded-2xl text-sm shadow-sm ${
          isMine
            ? "bg-rose-600 text-white rounded-tr-none"
            : "bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-tl-none text-zinc-900 dark:text-zinc-100"
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