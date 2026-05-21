
function Input({lable, ...props}: any) {
    return (
        <div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {lable}
              </label>
              <input
                {...props}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div>
        </div>
    )
}

export default Input