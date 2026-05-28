import { createAsyncThunk } from "@reduxjs/toolkit";
import { propertyApi } from "../../../lib/api/propertyApi";
import { Property } from "../../../types/propertyTypes";

export const fetchProperties = createAsyncThunk(
  "property/fetchAll",
  async () => {
    return await propertyApi.getAllProperties();
  },
);

export const createPropertyThunk = createAsyncThunk(
  "property/create",
  async (propertyData: FormData) => {
    return await propertyApi.saveProperty(propertyData);
  }
);

export const updatePropertyThunk = createAsyncThunk(
  "property/update",
  async ({
    id,
    property,
  }: {
    id: number;
    property: FormData;
  }) => {
    return await propertyApi.updateProperty(id, property as any);
  }
);

export const deletePropertyThunk = createAsyncThunk(
  "property/delete",
  async (id: number) => {
    return await propertyApi.deleteProperty(id);
  },
);
