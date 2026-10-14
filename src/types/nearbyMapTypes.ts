import type { Property } from "@/src/types/propertyTypes";

export interface NearbyProperty {
  property: Property;
  distance_km: number;
}

export type MapCenter = [number, number];

export interface NearbyMapProps {
  center: MapCenter;
  radiusKm: number;
  properties: NearbyProperty[];
  onCenterChange: (center: MapCenter) => void;
  onSelectProperty: (property: Property) => void;
}
