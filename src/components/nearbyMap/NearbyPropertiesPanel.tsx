"use client";

import type { Property } from "@/src/types/propertyTypes";
import type { NearbyProperty } from "@/src/types/nearbyMapTypes";

import NearbyMapEmptyState from "./NearbyMapEmptyState";
import NearbyPropertyItem from "./NearbyPropertyItem";

interface NearbyPropertiesPanelProps {
  properties: NearbyProperty[];
  selected: Property | null;
  loading: boolean;
  error: string | null;
  onSelectProperty: (property: Property) => void;
}

export default function NearbyPropertiesPanel({
  properties,
  selected,
  loading,
  error,
  onSelectProperty,
}: NearbyPropertiesPanelProps) {
  return (
    <aside className="flex max-h-[680px] min-h-[400px] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white">
      {/* Results header */}
      <div className="shrink-0 border-b border-zinc-200 bg-white px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
              Nearby results
            </p>

            <h2 className="mt-1 text-xl font-semibold text-black">
              Properties around you
            </h2>
          </div>

          <span className="grid h-10 min-w-10 place-items-center rounded-xl border border-zinc-300 bg-white px-2 text-sm font-bold text-black">
            {loading ? "…" : properties.length}
          </span>
        </div>
      </div>

      {/* Results content */}
      {error ? (
        <div
          role="alert"
          className="m-5 rounded-2xl border border-rose-300 bg-white p-4 text-sm text-rose-700"
        >
          {error}
        </div>
      ) : properties.length === 0 && !loading ? (
        <NearbyMapEmptyState />
      ) : (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-white p-4">
          {properties.map((item) => (
            <NearbyPropertyItem
              key={item.property.id}
              item={item}
              selected={selected?.id === item.property.id}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <p className="shrink-0 bg-white px-5 py-3 text-[11px] leading-5 text-zinc-500">
        {/* Only listings with valid latitude and longitude can appear on the map.
        Map tiles © OpenStreetMap contributors. */}
      </p>
    </aside>
  );
}