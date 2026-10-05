"use client";

import { useEffect, useMemo, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { Property } from "@/src/types/propertyTypes";

interface NearbyProperty {
  property: Property;
  distance_km: number;
}

interface Props {
  center: [number, number];
  radiusKm: number;
  properties: NearbyProperty[];
  onCenterChange: (center: [number, number]) => void;
  onSelectProperty: (property: Property) => void;
}

const markerIcon = L.divIcon({
  className: "nearby-property-marker",
  html: '<span class="nearby-property-marker__pin"></span>',
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

function MapEvents({ onCenterChange }: Pick<Props, "onCenterChange">) {
  const map = useMapEvents({
    moveend() {
      const center = map.getCenter();
      onCenterChange([center.lat, center.lng]);
    },
  });
  return null;
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    const current = map.getCenter();
    if (Math.abs(current.lat - center[0]) < 0.00001 && Math.abs(current.lng - center[1]) < 0.00001) return;
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

export default function NearbyPropertiesMap({
  center,
  radiusKm,
  properties,
  onCenterChange,
  onSelectProperty,
}: Props) {
  const [tilesLoaded, setTilesLoaded] = useState(true);
  const radiusMeters = useMemo(() => radiusKm * 1000, [radiusKm]);

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:shadow-black/20">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom
        className="z-0 h-full min-h-[520px] w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{
            loading: () => setTilesLoaded(false),
            load: () => setTilesLoaded(true),
          }}
        />
        <MapEvents onCenterChange={onCenterChange} />
        <RecenterMap center={center} />
        <Circle
          center={center}
          radius={radiusMeters}
          pathOptions={{ color: "#e11d48", fillColor: "#fb7185", fillOpacity: 0.08, weight: 2, dashArray: "7 8" }}
        />
        {properties.map(({ property, distance_km }) => {
          if (property.latitude == null || property.longitude == null) return null;
          return (
            <Marker
              key={property.id}
              position={[property.latitude, property.longitude]}
              icon={markerIcon}
              eventHandlers={{ click: () => onSelectProperty(property) }}
            >
              <Popup>
                <div className="min-w-44">
                  <p className="font-semibold">{property.title}</p>
                  <p className="text-sm text-zinc-600">{property.city || property.address}</p>
                  <p className="mt-1 text-sm font-bold text-rose-600">${property.price.toLocaleString()}</p>
                  <p className="text-xs text-zinc-500">{distance_km.toFixed(1)} km from map center</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-950/85">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Search area</p>
        <p className="mt-0.5 text-sm font-bold text-zinc-900 dark:text-white">{radiusKm} km radius</p>
      </div>
      {!tilesLoaded && (
        <div className="pointer-events-none absolute inset-0 z-[900] grid place-items-center bg-zinc-50/50 text-sm font-medium text-zinc-600 backdrop-blur-[1px]">
          Loading map tiles…
        </div>
      )}
    </div>
  );
}
