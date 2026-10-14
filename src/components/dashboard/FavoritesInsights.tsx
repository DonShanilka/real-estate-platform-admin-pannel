"use client";

import React from "react";

import type {
  Favorite,
  Property,
} from "@/src/redux/features/dashboard/dashboardTypes";

interface FavoritesInsightsProps {
  favorites: Favorite[];
  properties: Property[];
}

export default function FavoritesInsights({
  favorites,
  properties,
}: FavoritesInsightsProps) {
  const categoryCounts = new Map<string, number>();

  favorites.forEach((favorite) => {
    const propertyId = favorite.property_id ?? favorite.property?.id;

    const property =
      favorite.property ?? properties.find((item) => item.id === propertyId);

    const category = property?.property_type?.trim() || "Other";

    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
  });

  const categories = Array.from(categoryCounts.entries(), ([name, count]) => ({
    name,
    count,
  }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const maxCount = Math.max(...categories.map((category) => category.count), 1);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-bold text-black">Favorites Insights</h3>

        <p className="mt-1 text-xs text-gray-500">
          Favorite categories based on the available records
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No favorite records available.
        </p>
      ) : (
        <div className="space-y-5">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-gray-800">
                  {category.name}
                </span>

                <span className="text-xs font-bold text-black">
                  {category.count}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-black transition-all duration-500"
                  style={{
                    width: `${(category.count / maxCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-500">Favorites records available</p>

        <p className="mt-1 text-2xl font-extrabold text-black">
          {favorites.length.toLocaleString()}
        </p>
      </div>
    </section>
  );
}
