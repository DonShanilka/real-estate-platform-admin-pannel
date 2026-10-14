"use client";

import type { Property } from "@/src/types/propertyTypes";
import type { NearbyProperty } from "@/src/types/nearbyMapTypes";

interface NearbyPropertyItemProps {
  item: NearbyProperty;
  selected: boolean;
  onSelect: (property: Property) => void;
}

export default function NearbyPropertyItem({
  item,
  selected,
  onSelect,
}: NearbyPropertyItemProps) {
  const { property, distance_km } = item;

  const price = Number(property.price ?? 0);

  return (
    <button
      type="button"
      onClick={() => onSelect(property)}
      className={`group flex w-full gap-3 rounded-2xl border p-3 text-left transition
         hover:border-zinc-400 hover:bg-zinc-50 ${
           selected ? "border-black bg-zinc-100" : "border-zinc-200 bg-white"
         }`}
    >
      {/* Property image */}
      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        {property.image_url ? (
          <img
            src={property.image_url}
            alt={property.title || "Property"}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-2xl text-zinc-500">
            ⌂
          </div>
        )}
      </div>

      {/* Property details */}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-black">
          {property.title}
        </span>

        <span className="mt-1 block truncate text-xs text-zinc-500">
          {[property.city, property.district].filter(Boolean).join(", ") ||
            property.address ||
            "Location details unavailable"}
        </span>

        <span className="mt-2 flex items-center justify-between gap-2">
          <span className="truncate text-sm font-bold text-black">
            ${price.toLocaleString()}
          </span>

          <span
            className="shrink-0 rounded-lg border border-zinc-200 bg-white 
          px-2 py-1 text-[10px] font-semibold text-zinc-600"
          >
            {distance_km.toFixed(1)} km
          </span>
        </span>
      </span>
    </button>
  );
}
