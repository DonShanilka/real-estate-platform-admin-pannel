interface Props {
  message: string;
  time: string;
  isMine: boolean;
}

export default function MessageBubble({ message, time, isMine }: Props) {
  return (
    <div className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm shadow-sm ${
          isMine
            ? "bg-rose-600 text-white rounded-br-none"
            : "bg-zinc-800 text-white rounded-bl-none"
        }`}
      >
        <p className="break-words leading-relaxed">{message}</p>
        <span className={`text-[10px] mt-1.5 block ${isMine ? "text-rose-200" : "text-zinc-400"} text-right`}>
          {time}
        </span>
      </div>
    </div>
  );
}