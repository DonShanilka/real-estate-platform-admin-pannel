type FileInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  previewUrl?: string;
};

export default function FileInput({
  label,
  previewUrl,
  ...props
}: FileInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
        {label}
      </label>

      <input
        {...props}
        type="file"
        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium
      file:mr-4 file:px-3 file:py-1.5 file:border-0
      file:bg-blue-600 file:text-white file:rounded-lg
      dark:bg-zinc-800 dark:border-zinc-700"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-40 object-cover rounded-lg border"
        />
      )}
    </div>
  );
}