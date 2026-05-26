import { useEffect, useCallback } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";

import {
  fetchBookings,
  updateBookingStatus,
  setStatusFilter,
  setSearchQuery,
  clearError,
} from "@/src/redux/features/bookings/bookingsSlice";
import {
  selectFilteredBookings,
  selectBookingsLoading,
  selectBookingsError,
  selectStatusFilter,
  selectSearchQuery,
  selectBookingStats,
} from "@/src/redux/features/bookings/bookingsSelectors";
import { BookingStatus } from "@/src/types/booking";

export function useBookings() {
  const dispatch = useAppDispatch();

  const filteredBookings = useAppSelector(selectFilteredBookings);
  const loading = useAppSelector(selectBookingsLoading);
  const error = useAppSelector(selectBookingsError);
  const statusFilter = useAppSelector(selectStatusFilter);
  const searchQuery = useAppSelector(selectSearchQuery);
  const stats = useAppSelector(selectBookingStats);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleUpdateStatus = useCallback(
    async (id: number, status: BookingStatus) => {
      await dispatch(updateBookingStatus({ id, status }));
    },
    [dispatch]
  );

  const handleStatusFilterChange = useCallback(
    (filter: BookingStatus | "all") => {
      dispatch(setStatusFilter(filter));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const handleRefresh = useCallback(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    bookings: filteredBookings,
    loading,
    error,
    statusFilter,
    searchQuery,
    stats,
    updateStatus: handleUpdateStatus,
    setStatusFilter: handleStatusFilterChange,
    setSearchQuery: handleSearchChange,
    refresh: handleRefresh,
    clearError: handleClearError,
  };
}