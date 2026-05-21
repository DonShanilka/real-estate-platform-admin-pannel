"use client";

import { useEffect, useState } from "react";
import { propertyApi, Property } from "@/lib/api";

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const response = await propertyApi.getAllProperties();

      const data: Property[] =
        Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : [];

      setProperties(data);

      console.log("Fetched Properties:", data);
    } catch (error) {
      console.error(error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    setProperties,
    loading,
    fetchProperties,
  };
};