type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  onClose: () => void;
};

export default function ModalHeader({title, subtitle, onClose,}: ModalHeaderProps) {
  return (
    <div className="bg-zinc-950 text-white p-5 border-b border-zinc-850 flex justify-between items-center shrink-0">
      <div>
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-rose-500">
          {title}
        </h3>

        {subtitle && (
          <p className="text-[10px] text-zinc-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <button
        onClick={onClose}
        className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
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
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}