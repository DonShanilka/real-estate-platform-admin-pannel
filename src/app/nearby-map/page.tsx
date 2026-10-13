"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { propertyApi } from "@/src/lib/api/propertyApi";
import type { Property } from "@/src/types/propertyTypes";

const NearbyPropertiesMap = dynamic(
  () => import("@/src/components/propertyComponents/NearbyPropertiesMap"),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full min-h-[520px] place-items-center rounded-3xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500">
        Preparing your map…
      </div>
    ),
  },
);

interface NearbyProperty {
  property: Property;
  distance_km: number;
}

const DEFAULT_CENTER: [number, number] = [6.9271, 79.8612];

export default function NearbyMapPage() {
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [radiusKm, setRadiusKm] = useState(10);
  const [nearby, setNearby] = useState<NearbyProperty[]>([]);
  const [selected, setSelected] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  const searchNearby = useCallback(
    async (lat: number, lng: number, radius: number) => {
      setLoading(true);
      setError(null);

      try {
        const results = await propertyApi.getNearbyProperties(
          lat,
          lng,
          radius,
        );

        setNearby(results);
        setSelected(null);
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Nearby search failed",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void searchNearby(DEFAULT_CENTER[0], DEFAULT_CENTER[1], radiusKm);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [radiusKm, searchNearby]);

  const requestLocation = () => {
    setLocationMessage(null);

    if (!navigator.geolocation) {
      setLocationMessage("Location is not available in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const next: [number, number] = [
          coords.latitude,
          coords.longitude,
        ];

        setCenter(next);
        void searchNearby(next[0], next[1], radiusKm);
        setLocationMessage("Searching around your current location.");
      },
      () =>
        setLocationMessage(
          "Location permission was denied. Drag the map or search near Colombo instead.",
        ),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  const selectProperty = (property: Property) => {
    if (property.latitude == null || property.longitude == null) return;

    setSelected(property);
    setCenter([property.latitude, property.longitude]);
  };

  return (
    <main className="min-h-[calc(100vh-7rem)] space-y-6 bg-white pb-6">
      {/* Page Header */}
      <header className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white px-6 py-7 text-zinc-900 shadow-sm sm:px-9">
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">
              Explore by location
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              Find a place nearby
              <span className="text-zinc-400">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
              Explore properties by their actual coordinates. Move the map to
              search a new neighborhood, then open a marker for the details.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <label className="grid gap-1.5 text-xs font-semibold text-zinc-700">
              Search radius

              <select
                value={radiusKm}
                onChange={(event) => {
                  const nextRadius = Number(event.target.value);
                  setRadiusKm(nextRadius);
                  void searchNearby(center[0], center[1], nextRadius);
                }}
                className="h-11 min-w-36 rounded-xl border border-zinc-300 bg-white px-3 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-zinc-300"
              >
                {[2, 5, 10, 20, 50].map((radius) => (
                  <option
                    className="bg-white text-black"
                    value={radius}
                    key={radius}
                  >
                    {radius} km
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={requestLocation}
              className="h-11 rounded-xl border border-black bg-black px-4 text-sm font-bold text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
            >
              Use my location
            </button>
          </div>
        </div>

        {locationMessage && (
          <p
            aria-live="polite"
            className="relative mt-4 border-l-2 border-zinc-400 pl-3 text-xs text-zinc-600"
          >
            {locationMessage}
          </p>
        )}
      </header>

      {/* Map and Nearby Properties */}
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Map */}
        <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-zinc-200 bg-white">
          <NearbyPropertiesMap
            center={center}
            radiusKm={radiusKm}
            properties={nearby}
            onCenterChange={setCenter}
            onSelectProperty={setSelected}
          />

          <button
            type="button"
            onClick={() =>
              void searchNearby(center[0], center[1], radiusKm)
            }
            disabled={loading}
            className="absolute bottom-5 left-1/2 z-[1000] -translate-x-1/2 rounded-full border border-black bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Searching…" : "Search this area"}
          </button>
        </div>

        {/* Nearby Results Panel */}
        <aside className="flex max-h-[720px] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white">
          {/* Results Header */}
          <div className="border-b border-zinc-200 bg-white px-5 py-5">
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
                {loading ? "…" : nearby.length}
              </span>
            </div>
          </div>

          {/* Error State */}
          {error ? (
            <div
              role="alert"
              className="m-5 rounded-2xl border border-rose-300 bg-white p-4 text-sm text-rose-700"
            >
              {error}
            </div>
          ) : nearby.length === 0 && !loading ? (
            /* Empty State */
            <div className="m-auto max-w-xs bg-white px-6 py-12 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-zinc-200 bg-white text-2xl text-zinc-700">
                ⌖
              </div>

              <p className="mt-4 font-semibold text-black">
                No properties in this area
              </p>

              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Try a wider radius, move the map, or search around your current
                location.
              </p>
            </div>
          ) : (
            /* Property List */
            <div className="space-y-3 overflow-y-auto bg-white p-4">
              {nearby.map(({ property, distance_km }) => (
                <button
                  type="button"
                  key={property.id}
                  onClick={() => selectProperty(property)}
                  className={`group flex w-full gap-3 rounded-2xl border p-3 text-left transition hover:border-zinc-400 hover:bg-zinc-50 ${
                    selected?.id === property.id
                      ? "border-black bg-zinc-100"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  {/* Property Image */}
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-white">
                    {property.image_url ? (
                      <img
                        src={property.image_url}
                        alt=""
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-2xl text-zinc-500">
                        ⌂
                      </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-black">
                      {property.title}
                    </span>

                    <span className="mt-1 block truncate text-xs text-zinc-500">
                      {[property.city, property.district]
                        .filter(Boolean)
                        .join(", ") ||
                        property.address ||
                        "Location details unavailable"}
                    </span>

                    <span className="mt-2 flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-bold text-black">
                        ${property.price.toLocaleString()}
                      </span>

                      <span className="shrink-0 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-[10px] font-semibold text-zinc-600">
                        {distance_km.toFixed(1)} km
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <p className="border-t border-zinc-200 bg-white px-5 py-3 text-[11px] leading-5 text-zinc-500">
            Only listings with valid latitude and longitude can appear on the
            map. Map tiles © OpenStreetMap contributors.
          </p>
        </aside>
      </section>
    </main>
  );
}