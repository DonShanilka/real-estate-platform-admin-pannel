import { createAsyncThunk } from "@reduxjs/toolkit";

import { dashboardApi } from "../../../lib/api/dashboardApi";

import type {
  Booking,
  DashboardFetchResult,
  Favorite,
  Property,
} from "./dashboardTypes";

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Failed to load dashboard data.";
}

export const fetchDashboardData = createAsyncThunk<
  DashboardFetchResult,
  void,
  { rejectValue: string }
>("dashboard/fetchDashboardData", async (_, { rejectWithValue }) => {
  try {
    const results = await Promise.allSettled([
      dashboardApi.getProperties(),
      dashboardApi.getBookings(),
      dashboardApi.getFavorites(),
    ]);

    let properties: Property[] = [];
    let bookings: Booking[] = [];
    let favorites: Favorite[] = [];

    const errors: string[] = [];

    if (results[0].status === "fulfilled") {
      properties = results[0].value;
    } else {
      errors.push(`Properties: ${getErrorMessage(results[0].reason)}`);
    }

    if (results[1].status === "fulfilled") {
      bookings = results[1].value;
    } else {
      errors.push(`Bookings: ${getErrorMessage(results[1].reason)}`);
    }

    if (results[2].status === "fulfilled") {
      favorites = results[2].value;
    } else {
      errors.push(`Favorites: ${getErrorMessage(results[2].reason)}`);
    }

    // Reject only if every endpoint fails.
    if (errors.length === 3) {
      return rejectWithValue(errors.join(" | "));
    }

    return {
      properties,
      bookings,
      favorites,
      errors,
    };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
