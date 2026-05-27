import { createAsyncThunk } from "@reduxjs/toolkit";
import { reviewApi } from "@/src/lib/api/reviewApi";

export const fetchReviewsThunk = createAsyncThunk(
  "reviews/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await reviewApi.getAllReviews();
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to load reviews from the database.");
    }
  }
);

export const deleteReviewThunk = createAsyncThunk(
  "reviews/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      return await reviewApi.deleteReview(id);
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to delete review from the database.");
    }
  }
);
