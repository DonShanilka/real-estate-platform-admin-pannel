import { createAsyncThunk } from "@reduxjs/toolkit";
import { propertyApi } from "./propertyApi";
import { Property } from "../../../types/propertyTypes";

export const fetchProperties = createAsyncThunk(
  "property/fetchAll",
  async () => {
    return await propertyApi.getAllProperties();
  },
);

export const createPropertyThunk = createAsyncThunk(
  "property/create",
  async (property: Property) => {
    return await propertyApi.saveProperty(property);
  }
);

export const updatePropertyThunk = createAsyncThunk(
  "property/update",
  async ({ id, property }: { id: number; property: Partial<Property> }) => {
    return await propertyApi.updateProperty(id, property);
  },
);

export const deletePropertyThunk = createAsyncThunk(
  "property/delete",
  async (id: number) => {
    return await propertyApi.deleteProperty(id);
  },
);
