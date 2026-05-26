import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookingsState, Booking, BookingStatus } from "@/src/types/booking";
import { bookingApi } from "@/src/lib/api/bookingApi";

const initialState: BookingsState = {
  items: [],
  loading: false,
  error: null,
  statusFilter: "all",
  searchQuery: "",
};


export const fetchBookings = createAsyncThunk(
  "bookings/fetchAll",
  async (
    params: { status?: string; search?: string } | undefined,
    { rejectWithValue }
  ) => {
    try {
      return await bookingApi.getAll(params);
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  "bookings/updateStatus",
  async (
    { id, status }: { id: number; status: BookingStatus },
    { rejectWithValue }
  ) => {
    try {
      return await bookingApi.updateStatus(id, status);
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message);
    }
  }
);


const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setStatusFilter(
      state,
      action: PayloadAction<BookingStatus | "all">
    ) {
      state.statusFilter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchBookings
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // updateBookingStatus
    builder
      .addCase(updateBookingStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((b) => b.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setStatusFilter, setSearchQuery, clearError } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;