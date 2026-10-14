"use client";

import dynamic from "next/dynamic";

import type { Property } from "@/src/types/propertyTypes";
import type {
  MapCenter,
  NearbyProperty,
} from "@/src/types/nearbyMapTypes";

interface NearbyMapSectionProps {
  center: MapCenter;
  radiusKm: number;
  properties: NearbyProperty[];
  loading: boolean;
  onCenterChange: (center: MapCenter) => void;
  onSelectProperty: (property: Property) => void;
  onSearchArea: () => void;
}

const NearbyPropertiesMap = dynamic(
  () => import("@/src/components/nearbyMap/NearbyPropertiesMap"),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-[680px] w-full place-items-center rounded-3xl border 
      border-zinc-200 bg-white text-sm font-medium text-zinc-500">
        Preparing your map…
      </div>
    ),
  },
);

export default function NearbyMapSection({
  center,
  radiusKm,
  properties,
  loading,
  onCenterChange,
  onSelectProperty,
  onSearchArea,
}: NearbyMapSectionProps) {
  return (
    <div className="relative max-h-[680px] min-h-full overflow-hidden rounded-3xl border border-zinc-200 bg-white">
      <NearbyPropertiesMap
        center={center}
        radiusKm={radiusKm}
        properties={properties}
        onCenterChange={onCenterChange}
        onSelectProperty={onSelectProperty}
      />

      <button
        type="button"
        onClick={onSearchArea}
        disabled={loading}
        className="absolute bottom-5 left-1/2 z-[1000] -translate-x-1/2 -translate-y-0 
        rounded-full border border-black bg-black px-5 py-3 text-sm font-bold 
        text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Searching…" : "Search this area"}
      </button>
    </div>
  );
}