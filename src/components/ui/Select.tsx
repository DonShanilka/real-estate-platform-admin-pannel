type Option = {
    lable: string;
    value: string
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    lable: string;
    options: Option[];
}

export default function Select({lable, options, ...props}: SelectProps) {
    return (
        <>
            <div className="space-y-1">
                {/* <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Property Type
                </label> */}
                <select
                  {...props}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.lable}</option>
                    ))}
                </select>
              </div>
        </>
    )
}