// src/services/property-api.ts

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

const BASE_URL = "http://127.0.0.1:8000/properties";

// FALLBACK DATABASE

const fallbackProperties: Property[] = [
  {
    id: 1,
    title: "Luxury Ocean View Apartment",
    description:
      "Beautiful apartment with ocean views and modern interiors.",
    price: 250000,
    property_type: PropertyType.APARTMENT,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 3,
    bathrooms: 2,
    area_size: 1800,
    address: "12 Palm Street",
    city: "Colombo",
    district: "Western",
    country: "Sri Lanka",
    latitude: 6.9271,
    longitude: 79.8612,
    owner_id: 1,
    image_url:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    video_url: "",
  },
  {
    id: 2,
    title: "Modern Family House",
    description:
      "Spacious family house with garden and parking.",
    price: 180000,
    property_type: PropertyType.HOUSE,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 4,
    bathrooms: 3,
    area_size: 2400,
    address: "45 Green Avenue",
    city: "Kandy",
    district: "Central",
    country: "Sri Lanka",
    latitude: 7.2906,
    longitude: 80.6337,
    owner_id: 2,
    image_url:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    video_url: "",
  },
];

const getFallbackDB = (): Property[] => {
  if (typeof window === "undefined") return fallbackProperties;

  const stored = localStorage.getItem("estate_properties");

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      return fallbackProperties;
    }
  }

  localStorage.setItem(
    "estate_properties",
    JSON.stringify(fallbackProperties)
  );

  return fallbackProperties;
};

const saveFallbackDB = (data: Property[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("estate_properties", JSON.stringify(data));
  }
};



export const propertyApi = {

  // GET ALL PROPERTIES

  async getAllProperties(): Promise<Property[]> {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/properties/getAllProperty",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      console.log("All properties:", data);

      return data;
    } catch (error) {
      console.warn(
        "Backend unavailable. Using localStorage fallback.",
        error
      );

      return getFallbackDB();
    }
  },


  // GET PROPERTY BY ID

  async getPropertyById(id: number): Promise<Property | null> {
    try {
      const response = await fetch(
        `${BASE_URL}/getById/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch property");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.warn(
        `Backend unavailable. Using localStorage fallback for property ${id}`,
        error
      );

      const db = getFallbackDB();

      return db.find((item) => item.id === id) || null;
    }
  },


  // SAVE PROPERTY

  async saveProperty(
    property: Omit<Property, "id">
  ): Promise<Property> {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/properties/saveProperty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save property");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.warn(
        "Backend unavailable. Saving to localStorage.",
        error
      );

      const db = getFallbackDB();

      const newId =
        db.length > 0
          ? Math.max(...db.map((p) => p.id || 0)) + 1
          : 1;

      const newProperty: Property = {
        ...property,
        id: newId,
      };

      const updatedDB = [...db, newProperty];

      saveFallbackDB(updatedDB);

      return newProperty;
    }
  },


  // UPDATE PROPERTY

  async updateProperty(
    id: number,
    property: Partial<Property>
  ): Promise<Property> {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/properties/updateProperty/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update property");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.warn(
        `Backend unavailable. Updating property ${id} in localStorage.`,
        error
      );

      const db = getFallbackDB();

      const updatedProperties = db.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...property,
          };
        }

        return item;
      });

      saveFallbackDB(updatedProperties);

      return updatedProperties.find(
        (item) => item.id === id
      ) as Property;
    }
  },


  // DELETE PROPERTY

  async deleteProperty(id: number): Promise<boolean> {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/properties/deleteProperty/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete property");
      }

      return true;
    } catch (error) {
      console.warn(
        `Backend unavailable. Deleting property ${id} from localStorage.`,
        error
      );

      const db = getFallbackDB();

      const updatedDB = db.filter((item) => item.id !== id);

      saveFallbackDB(updatedDB);

      return true;
    }
  },
};