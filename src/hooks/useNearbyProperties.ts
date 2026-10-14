"use client";

import { useCallback, useEffect, useState } from "react";

import { propertyApi } from "@/src/lib/api/propertyApi";
import type { Property } from "@/src/types/propertyTypes";
import type { MapCenter, NearbyProperty } from "@/src/types/nearbyMapTypes";

const DEFAULT_CENTER: MapCenter = [6.9271, 79.8612];

export function useNearbyProperties() {
  const [center, setCenter] = useState<MapCenter>(DEFAULT_CENTER);
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
        const results = await propertyApi.getNearbyProperties(lat, lng, radius);

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

  // Initial search around Colombo.
  useEffect(() => {
    void searchNearby(DEFAULT_CENTER[0], DEFAULT_CENTER[1], 10);
  }, [searchNearby]);

  // Change search radius and search around the current map center.
  const changeRadius = useCallback(
    (nextRadius: number) => {
      setRadiusKm(nextRadius);

      void searchNearby(center[0], center[1], nextRadius);
    },
    [center, searchNearby],
  );

  // Request the user's current location.
  const requestLocation = useCallback(() => {
    setLocationMessage(null);

    if (!navigator.geolocation) {
      setLocationMessage("Location is not available in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nextCenter: MapCenter = [coords.latitude, coords.longitude];

        setCenter(nextCenter);

        void searchNearby(nextCenter[0], nextCenter[1], radiusKm);

        setLocationMessage("Searching around your current location.");
      },
      () => {
        setLocationMessage(
          "Location permission was denied. Drag the map or search near Colombo instead.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  }, [radiusKm, searchNearby]);

  // Select a property from the results.
  const selectProperty = useCallback((property: Property) => {
    if (property.latitude == null || property.longitude == null) {
      return;
    }

    setSelected(property);

    setCenter([property.latitude, property.longitude]);
  }, []);

  return {
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
  };
}
