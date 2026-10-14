"use client";

import React, { useMemo } from "react";

import type {
  Booking,
  DashboardPeriod,
} from "@/src/redux/features/dashboard/dashboardTypes";

interface RevenueChartProps {
  bookings: Booking[];
  period: DashboardPeriod;
}

interface ChartPoint {
  label: string;
  value: number;
}

function getChartPoints(
  bookings: Booking[],
  period: DashboardPeriod,
): ChartPoint[] {
  const now = new Date();

  if (period === "weekly") {
    const points: ChartPoint[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);

      date.setDate(now.getDate() - i);

      const count = bookings.filter((booking) => {
        if (!booking.created_at) return false;

        const createdAt = new Date(booking.created_at);

        return (
          createdAt.getFullYear() === date.getFullYear() &&
          createdAt.getMonth() === date.getMonth() &&
          createdAt.getDate() === date.getDate()
        );
      }).length;

      points.push({
        label: date.toLocaleDateString("en", {
          weekday: "short",
        }),
        value: count,
      });
    }

    return points;
  }

  if (period === "yearly") {
    const points: ChartPoint[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

      const count = bookings.filter((booking) => {
        if (!booking.created_at) return false;

        const createdAt = new Date(booking.created_at);

        return (
          createdAt.getFullYear() === date.getFullYear() &&
          createdAt.getMonth() === date.getMonth()
        );
      }).length;

      points.push({
        label: date.toLocaleDateString("en", {
          month: "short",
        }),
        value: count,
      });
    }

    return points;
  }

  const points: ChartPoint[] = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const count = bookings.filter((booking) => {
      if (!booking.created_at) return false;

      const createdAt = new Date(booking.created_at);

      return (
        createdAt.getFullYear() === date.getFullYear() &&
        createdAt.getMonth() === date.getMonth()
      );
    }).length;

    points.push({
      label: date.toLocaleDateString("en", {
        month: "short",
      }),
      value: count,
    });
  }

  return points;
}

export default function RevenueChart({ bookings, period }: RevenueChartProps) {
  const points = useMemo(
    () => getChartPoints(bookings, period),
    [bookings, period],
  );

  const maxValue = Math.max(...points.map((point) => point.value), 1);

  const width = 500;
  const height = 190;

  const chartPoints = points.map((point, index) => ({
    ...point,
    x: points.length === 1 ? width / 2 : (index / (points.length - 1)) * width,
    y: height - (point.value / maxValue) * (height - 20) - 10,
  }));

  const linePath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  const totalBookings = points.reduce((total, point) => total + point.value, 0);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-black">Booking Activity</h3>

          <p className="mt-1 text-xs text-gray-500">
            Booking creation trend for the selected period
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-[10px] text-gray-500">Total Bookings</p>

          <p className="mt-1 text-lg font-bold text-black">
            {totalBookings.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="relative mt-6 h-64 w-full">
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Booking activity chart"
        >
          <defs>
            <linearGradient
              id="bookingAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />

              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[40, 80, 120, 160].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2={width}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          <path d={areaPath} fill="url(#bookingAreaGradient)" />

          <path
            d={linePath}
            fill="none"
            stroke="#111827"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {chartPoints.map((point) => (
            <circle
              key={point.label}
              cx={point.x}
              cy={point.y}
              r="3.5"
              fill="#111827"
            />
          ))}
        </svg>

        <div className="absolute bottom-0 left-0 flex w-full justify-between gap-1 text-[10px] text-gray-500">
          {points.map((point, index) => {
            const showLabel =
              points.length <= 7 ||
              index % 2 === 0 ||
              index === points.length - 1;

            return (
              <span key={`${point.label}-${index}`}>
                {showLabel ? point.label : ""}
              </span>
            );
          })}
        </div>
      </div>

      {totalBookings === 0 && (
        <p className="mt-2 text-center text-xs text-gray-500">
          No booking activity found for this period.
        </p>
      )}
    </section>
  );
}
