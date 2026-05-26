import { RootState } from "@/src/redux/store";
import { createSelector } from "@reduxjs/toolkit";

const selectBookingsState = (state: RootState) => state.bookings;

export const selectAllBookings = (state: RootState) => state.bookings.items;
export const selectBookingsLoading = (state: RootState) => state.bookings.loading;
export const selectBookingsError = (state: RootState) => state.bookings.error;
export const selectStatusFilter = (state: RootState) => state.bookings.statusFilter;
export const selectSearchQuery = (state: RootState) => state.bookings.searchQuery;

/** Memoized selector — filters bookings by status + search client-side */
export const selectFilteredBookings = createSelector(
  selectAllBookings,
  selectStatusFilter,
  selectSearchQuery,
  (items, statusFilter, searchQuery) => {
    const q = searchQuery.toLowerCase();

    return items.filter((b:any) => {
      const matchesStatus =
        statusFilter === "all" || b.status === statusFilter;

      const matchesSearch =
        !q ||
        b.user?.full_name?.toLowerCase().includes(q) ||
        b.user?.email?.toLowerCase().includes(q) ||
        b.property?.title?.toLowerCase().includes(q) ||
        String(b.id).includes(q);

      return matchesStatus && matchesSearch;
    });
  }
);

export const selectBookingStats = createSelector(
  selectAllBookings,
  (items) => ({
    total: items.length,
    confirmed: items.filter((b) => b.status === "confirmed").length,
    pending: items.filter((b) => b.status === "pending").length,
    cancelled: items.filter((b) => b.status === "cancelled").length,
  })
);