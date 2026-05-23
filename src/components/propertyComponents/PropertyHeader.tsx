"use client";

import { Icons } from "@/src/components/Icons";

interface Props {
  total: number;
  onAddProperty: () => void;
}

export default function PropertyHeader({ total, onAddProperty }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
      <p className="text-xs text-zinc-400">
        Total properties cataloged: {total}
      </p>

      <button
        onClick={onAddProperty}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl"
      >
        <Icons.Plus size={16} />
        Add Property
      </button>
    </div>
  );
}
