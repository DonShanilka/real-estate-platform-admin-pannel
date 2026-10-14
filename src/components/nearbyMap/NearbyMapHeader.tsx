"use client";

import NearbyMapControls from "./NearbyMapControls";

interface NearbyMapHeaderProps {
  radiusKm: number;
  locationMessage: string | null;
  onRadiusChange: (radius: number) => void;
  onRequestLocation: () => void;
}

export default function NearbyMapHeader({
  radiusKm,
  locationMessage,
  onRadiusChange,
  onRequestLocation,
}: NearbyMapHeaderProps) {
  return (
    <header
      className="relative overflow-hidden rounded-[2rem] border border-zinc-200 
      bg-white px-6 py-4 text-zinc-900 shadow-sm sm:px-9"
    >
      <div className="relative flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">
            Explore by location
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
            Find a place nearby
            <span className="text-zinc-400">.</span>
          </h1>

          {/* <p className="mt-1 max-w-xl text-sm leading-5 text-zinc-600">
            Explore properties by their actual coordinates. Move the map to
            search a new neighborhood, then open a marker for the details.
          </p> */}
        </div>

        <NearbyMapControls
          radiusKm={radiusKm}
          onRadiusChange={onRadiusChange}
          onRequestLocation={onRequestLocation}
        />
      </div>

      {locationMessage && (
        <p
          aria-live="polite"
          className="relative mt-3 border-l-2 border-zinc-400 pl-3 text-xs text-zinc-600"
        >
          {locationMessage}
        </p>
      )}
    </header>
  );
}