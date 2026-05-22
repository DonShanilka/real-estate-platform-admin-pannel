import { Property } from "../../../types/propertyTypes";

const BASE_URL = "http://127.0.0.1:8000";

const STORAGE_KEY = "estate_properties";

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

  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

  return [];
};

const saveFallbackDB = (data: Property[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const propertyApi = {
  async getAllProperties(): Promise<Property[]> {
    try {
      const response = await fetch(`${BASE_URL}/properties/getAllProperty`);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      console.log(data);
      saveFallbackDB(data);

      return data.data;
    } catch {
      return getFallbackDB();
    }
  },

  async saveProperty(property: Omit<Property, "id">): Promise<Property> {
    try {
      const response = await fetch(`${BASE_URL}/properties/saveProperty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      });

      return await response.json();
    } catch {
      const db = getFallbackDB();

      const newProperty = {
        ...property,
        id: db.length > 0 ? Math.max(...db.map((p) => p.id || 0)) + 1 : 1,
      };

      saveFallbackDB([...db, newProperty]);

      return newProperty;
    }
  },

  async updateProperty(
    id: number,
    property: Partial<Property>,
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
        },
      );

      return await response.json();
    } catch {
      const db = getFallbackDB();

      const updated = db.map((p) => (p.id === id ? { ...p, ...property } : p));

      saveFallbackDB(updated);

      return updated.find((p) => p.id === id) as Property;
    }
  },

  async deleteProperty(id: number) {
    try {
      await fetch(`${BASE_URL}/properties/deleteProperty/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch {
      const db = getFallbackDB();

      const updated = db.filter((p) => p.id !== id);

      saveFallbackDB(updated);

      return id;
    }
  },
};
