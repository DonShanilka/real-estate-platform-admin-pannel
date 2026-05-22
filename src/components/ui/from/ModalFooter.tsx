type ModalFooterProps = {
  onClose: () => void;
  onSubmit: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
};

export default function ModalFooter({
  onClose,
  onSubmit,
  submitText = "Save",
  cancelText = "Cancel",
  loading = false,
}: ModalFooterProps) {
  return (
    <div className="bg-zinc-950 px-6 py-4 border-t border-zinc-200 flex justify-end gap-3 shrink-0 dark:bg-zinc-850 dark:border-zinc-800">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 border border-zinc-200 dark:border-zinc-750 text-xs font-semibold rounded-xl transition-all"
      >
        {cancelText}
      </button>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="px-5 py-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-bold rounded-xl hover:opacity-90 shadow-md shadow-rose-500/10 transition-all disabled:opacity-50"
      >
        {submitText}
      </button>
    </div>
  );
}