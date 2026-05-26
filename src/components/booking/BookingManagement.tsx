"use client";

import { useBookings } from "@/src/hooks/useBookings";
import BookingFilters from "@/src/components/booking/BookingFilters";
import BookingTable from "@/src/components/booking/BookingTable";
import BookingLoadingSkeleton from "@/src/components/booking/BookingLoadingSkeleton";
import BookingErrorBanner from "@/src/components/booking/BookingErrorBanner";

export default function BookingManagement() {
  const {
    bookings,
    loading,
    error,
    statusFilter,
    searchQuery,
    updateStatus,
    setStatusFilter,
    setSearchQuery,
    clearError,
  } = useBookings();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Filter bar: status tabs + search input */}
      <BookingFilters
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        onStatusFilterChange={setStatusFilter}
        onSearchChange={setSearchQuery}
      />

      {/* API error banner */}
      {error && (
        <BookingErrorBanner error={error} onDismiss={clearError} />
      )}

      {/* Loading skeleton or data table */}
      {loading ? (
        <BookingLoadingSkeleton />
      ) : (
        <BookingTable bookings={bookings} onUpdateStatus={updateStatus} />
      )}
    </div>
  );
}