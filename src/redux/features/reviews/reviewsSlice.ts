import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "@/src/types/review";
import { fetchReviewsThunk, deleteReviewThunk } from "./reviewsThunk";

export interface ReviewsState {
  items: Review[];
  loading: boolean;
  error: string | null;
  activeTab: "All" | "Pending" | "Approved" | "Rejected";
}

const initialState: ReviewsState = {
  items: [],
  loading: false,
  error: null,
  activeTab: "All",
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<"All" | "Pending" | "Approved" | "Rejected">) {
      state.activeTab = action.payload;
    },
    updateLocalReviewStatus(
      state,
      action: PayloadAction<{ id: number; status: "Approved" | "Rejected" }>
    ) {
      const { id, status } = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem(`review_status_${id}`, status);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reviews
      .addCase(fetchReviewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsThunk.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchReviewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete review
      .addCase(deleteReviewThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setActiveTab, updateLocalReviewStatus } = reviewsSlice.actions;

export default reviewsSlice.reducer;
