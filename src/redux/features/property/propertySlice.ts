import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Property } from "../../../types/propertyTypes";

import {
  fetchProperties,
  createPropertyThunk,
  updatePropertyThunk,
  deletePropertyThunk,
} from "./propertyThunk";

interface PropertyState {
  properties: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchProperties.fulfilled,
        (state, action: PayloadAction<Property[]>) => {
          state.loading = false;
          state.properties = action.payload;
        },
      )

      .addCase(fetchProperties.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load properties";
      })

      .addCase(createPropertyThunk.fulfilled, (state, action) => {
        state.properties.push(action.payload);
      })

      .addCase(updatePropertyThunk.fulfilled, (state, action) => {
        const index = state.properties.findIndex(
          (p) => p.id === action.payload.id,
        );

        if (index !== -1) {
          state.properties[index] = action.payload;
        }
      })

      .addCase(deletePropertyThunk.fulfilled, (state, action) => {
        state.properties = state.properties.filter(
          (p) => p.id !== action.payload,
        );
      });
  },
});

export default propertySlice.reducer;
