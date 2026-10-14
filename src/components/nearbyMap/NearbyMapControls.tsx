"use client";

interface NearbyMapControlsProps {
  radiusKm: number;
  onRadiusChange: (radius: number) => void;
  onRequestLocation: () => void;
}

export default function NearbyMapControls({
  radiusKm,
  onRadiusChange,
  onRequestLocation,
}: NearbyMapControlsProps) {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <label className="grid gap-1 text-xs font-semibold text-zinc-700">
        Search radius

        <select
          value={radiusKm}
          onChange={(event) =>
            onRadiusChange(Number(event.target.value))
          }
          className="h-9 min-w-32 rounded-xl border border-zinc-300 bg-white px-3 
          text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-zinc-300"
        >
          {[2, 5, 10, 20, 50].map((radius) => (
            <option
              key={radius}
              value={radius}
              className="bg-white text-black"
            >
              {radius} km
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={onRequestLocation}
        className="h-9 rounded-xl border border-black bg-black px-4 text-sm 
        font-bold text-white transition hover:bg-zinc-800 focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
      >
        Use my location
      </button>
    </div>
  );
}