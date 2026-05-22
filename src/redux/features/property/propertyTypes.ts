export enum PropertyType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  LAND = "LAND",
  VILLA = "VILLA",
}

export enum PropertyStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  RENTED = "RENTED",
}

export interface Property {
  id?: number;
  title: string;
  description: string | null;
  price: number;
  property_type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area_size: number;
  address: string;
  city: string;
  district: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  owner_id: number;
  image_url: string;
  video_url: string;
}
