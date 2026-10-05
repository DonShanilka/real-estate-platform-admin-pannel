import { Property } from "../../types/propertyTypes";

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

  async saveProperty(propertyData: FormData) {
    const response = await fetch(`${BASE_URL}/properties/saveProperty`, {
      method: "POST",
      body: propertyData,
    });

    if (!response.ok) {
      throw new Error("Failed to create property");
    }

    return await response.json();
  },

  async updateProperty(
  id: number,
  propertyData: FormData
) {
  const response = await fetch(
    `${BASE_URL}/properties/updateProperty/${id}`,
    {
      method: "PUT",
      body: propertyData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update property");
  }

  return await response.json();
},

  async deleteProperty(id: number) {
    const response = await fetch(`${BASE_URL}/properties/deleteProperty/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.detail || "Failed to delete property");
    }

    return id;
  },
};
