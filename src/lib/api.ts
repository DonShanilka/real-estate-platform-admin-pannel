
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

const BASE_URL = "http://127.0.0.1:8000";

// FALLBACK DB KEY
const STORAGE_KEY = "estate_properties";

// FALLBACK DB
const getFallbackDB = (): Property[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([])
  );

  return [];
};

const saveFallbackDB = (data: Property[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }
};


// API
export const propertyApi = {
  // GET ALL
  async getAllProperties(): Promise<Property[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/properties/getAllProperty`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // save cache
      saveFallbackDB(data);

      console.log("API Properties:", data);

      return data;
    } catch (error) {
      console.error(
        "Backend unavailable. Using fallback.",
        error
      );

      return getFallbackDB();
    }
  },

  // GET BY ID
  async getPropertyById(
    id: number
  ): Promise<Property | null> {
    try {
      const response = await fetch(
        `${BASE_URL}/properties/getById/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      return await response.json();
    } catch {
      const db = getFallbackDB();
      return db.find((p) => p.id === id) || null;
    }
  },

  // SAVE
  async saveProperty(
    property: Omit<Property, "id">
  ): Promise<Property> {
    try {
      const response = await fetch(
        `${BASE_URL}/properties/saveProperty`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property),
        }
      );

      if (!response.ok) {
        throw new Error("Save failed");
      }

      return await response.json();
    } catch {
      const db = getFallbackDB();

      const newId =
        db.length > 0
          ? Math.max(...db.map((p) => p.id || 0)) + 1
          : 1;

      const newProperty: Property = {
        ...property,
        id: newId,
      };

      const updated = [...db, newProperty];
      saveFallbackDB(updated);

      return newProperty;
    }
  },

  // UPDATE
  async updateProperty(
    id: number,
    property: Partial<Property>
  ): Promise<Property> {
    try {
      const response = await fetch(
        `${BASE_URL}/properties/updateProperty/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      return await response.json();
    } catch {
      const db = getFallbackDB();

      const updated = db.map((p) =>
        p.id === id ? { ...p, ...property } : p
      );

      saveFallbackDB(updated);

      return updated.find((p) => p.id === id)!;
    }
  },

  // DELETE
  async deleteProperty(id: number): Promise<boolean> {
    try {
      const response = await fetch(
        `${BASE_URL}/properties/deleteProperty/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      return true;
    } catch {
      const db = getFallbackDB();

      const updated = db.filter((p) => p.id !== id);
      saveFallbackDB(updated);

      return true;
    }
  },
};