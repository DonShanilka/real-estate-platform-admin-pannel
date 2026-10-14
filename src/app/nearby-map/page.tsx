"use client";

import NearbyMapHeader from "@/src/components/nearbyMap/NearbyMapHeader";
import NearbyMapSection from "@/src/components/nearbyMap/NearbyMapSection";
import NearbyPropertiesPanel from "@/src/components/nearbyMap/NearbyPropertiesPanel";

import { useNearbyProperties } from "@/src/hooks/useNearbyProperties";

export default function NearbyMapPage() {
  const {
    center,
    setCenter,
    radiusKm,
    nearby,
    selected,
    loading,
    error,
    locationMessage,
    searchNearby,
    changeRadius,
    requestLocation,
    selectProperty,
    setSelected,
  } = useNearbyProperties();

  return (
    <main className="min-h-[calc(100vh-7rem)] space-y-6 bg-white pb-6">
      {/* Page header */}
      <NearbyMapHeader
        radiusKm={radiusKm}
        locationMessage={locationMessage}
        onRadiusChange={changeRadius}
        onRequestLocation={requestLocation}
      />

      {/* Map and results */}
      <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Map */}
        <NearbyMapSection
          center={center}
          radiusKm={radiusKm}
          properties={nearby}
          loading={loading}
          onCenterChange={setCenter}
          onSelectProperty={setSelected}
          onSearchArea={() => void searchNearby(center[0], center[1], radiusKm)}
        />

        {/* Results panel */}
        <NearbyPropertiesPanel
          properties={nearby}
          selected={selected}
          loading={loading}
          error={error}
          onSelectProperty={selectProperty}
        />
      </section>
    </main>
  );
}
