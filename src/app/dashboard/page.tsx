"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/src/redux/store";

import { fetchDashboardData } from "@/src/redux/features/dashboard/dashboardThunk";

import { setDashboardPeriod } from "@/src/redux/features/dashboard/dashboardSlice";

import DashboardHeader from "@/src/components/dashboard/DashboardHeader";
import DashboardStats from "@/src/components/dashboard/DashboardStats";
import RevenueChart from "@/src/components/dashboard/RevenueChart";
import TopProperties from "@/src/components/dashboard/TopProperties";
import RecentBookings from "@/src/components/dashboard/RecentBookings";
import FavoritesInsights from "@/src/components/dashboard/FavoritesInsights";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, selectedPeriod, loading, error, errors, lastUpdated } =
    useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchDashboardData());
  };

  return (
    <main className="min-h-full space-y-6 overflow-y-auto bg-white text-black animate-in fade-in slide-in-from-bottom-2 duration-300">
      <DashboardHeader
        selectedPeriod={selectedPeriod}
        onPeriodChange={(period) => dispatch(setDashboardPeriod(period))}
        onRefresh={handleRefresh}
        loading={loading}
        lastUpdated={lastUpdated}
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <p className="text-sm font-semibold text-red-800">
            Dashboard could not be loaded
          </p>

          <p className="mt-1 text-xs text-red-700">{error}</p>

          <button
            type="button"
            onClick={handleRefresh}
            className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
          >
            Try Again
          </button>
        </div>
      )}

      {errors.length > 0 && !error && (
        <div
          role="status"
          className="rounded-xl border border-amber-200 bg-amber-50 p-4"
        >
          <p className="text-sm font-semibold text-amber-900">
            Some dashboard data is unavailable
          </p>

          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-amber-800">
            {errors.map((message: any) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {loading &&
      data.properties.length === 0 &&
      data.bookings.length === 0 &&
      data.favorites.length === 0 ? (
        <section
          aria-label="Loading dashboard"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-gray-50"
            />
          ))}
        </section>
      ) : (
        <>
          {/* Platform Overview */}
          <DashboardStats
            properties={data.properties}
            bookings={data.bookings}
            favorites={data.favorites}
          />

          {/* Booking Activity + Top Properties */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RevenueChart bookings={data.bookings} period={selectedPeriod} />
            </div>

            <TopProperties properties={data.properties} />
          </section>

          {/* Recent Bookings */}
          <RecentBookings bookings={data.bookings} />

          {/* Favorites Insights */}
          <FavoritesInsights
            favorites={data.favorites}
            properties={data.properties}
          />
        </>
      )}

      <footer className="border-t border-gray-100 pt-4 text-[10px] text-gray-400">
        EstateAI Admin Console · Dashboard data is provided by the connected
        backend services.
      </footer>
    </main>
  );
}
