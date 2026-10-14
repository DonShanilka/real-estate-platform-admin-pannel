import { createAsyncThunk } from "@reduxjs/toolkit";

import { dashboardApi } from "../../../lib/api/dashboardApi";

import type {
  Booking,
  DashboardData,
  Favorite,
  Property,
} from "./dashboardTypes";

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Failed to load dashboard data.";
}

export const fetchDashboardData = createAsyncThunk<
  DashboardData,
  void,
  { rejectValue: string }
>("dashboard/fetchDashboardData", async (_, { rejectWithValue }) => {
  try {
    const results = await Promise.allSettled([
      dashboardApi.getProperties(),
      dashboardApi.getBookings(),
      dashboardApi.getFavorites(),
    ]);

    const propertiesResult = results[0];
    const bookingsResult = results[1];
    const favoritesResult = results[2];

    const errors: string[] = [];

    let properties: Property[] = [];
    let bookings: Booking[] = [];
    let favorites: Favorite[] = [];

    if (propertiesResult.status === "fulfilled") {
      properties = propertiesResult.value;
    } else {
      errors.push(`Properties: ${getErrorMessage(propertiesResult.reason)}`);
    }

    if (bookingsResult.status === "fulfilled") {
      bookings = bookingsResult.value;
    } else {
      errors.push(`Bookings: ${getErrorMessage(bookingsResult.reason)}`);
    }

    if (favoritesResult.status === "fulfilled") {
      favorites = favoritesResult.value;
    } else {
      errors.push(`Favorites: ${getErrorMessage(favoritesResult.reason)}`);
    }

    // Keep the dashboard useful when one endpoint fails.
    // Show a warning instead of silently treating failed data as zero.
    return {
      properties,
      bookings,
      favorites,
      errors,
    } as DashboardData & { errors: string[] };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
