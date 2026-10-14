import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { fetchDashboardData } from "./dashboardThunk";

import type {
  DashboardData,
  DashboardPeriod,
  DashboardState,
} from "./dashboardTypes";

const initialData: DashboardData = {
  properties: [],
  bookings: [],
  favorites: [],
};

const initialState: DashboardState = {
  data: initialData,
  selectedPeriod: "monthly",
  loading: false,
  error: null,
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    setDashboardPeriod(state, action: PayloadAction<DashboardPeriod>) {
      state.selectedPeriod = action.payload;
    },
    clearDashboardError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;

        state.data = {
          properties: action.payload.properties,
          bookings: action.payload.bookings,
          favorites: action.payload.favorites,
        };

        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to load dashboard data.";
      });
  },
});

export const { setDashboardPeriod, clearDashboardError } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
