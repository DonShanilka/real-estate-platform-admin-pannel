interface Props {
  name: string;
  online?: boolean;
}

export default function ChatHeader({
  name,
  online,
}: Props) {
  return (
    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-3">

        <div className="relative">

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-gradient-to-r
              from-rose-600
              to-amber-500
              flex
              items-center
              justify-center
              text-white
              font-bold
            "
          >
            {name.substring(0, 2).toUpperCase()}
          </div>

          {online && (
            <span
              className="
                absolute
                bottom-0
                right-0
                w-3
                h-3
                rounded-full
                bg-green-500
                border-2
                border-white
              "
            />
          )}
        </div>

        <div>
          <h3 className="font-semibold text-sm">
            {name}
          </h3>

          <span className="text-xs text-zinc-500">
            {online
              ? "Online"
              : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}