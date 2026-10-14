"use client";

import React from "react";

import type { Property } from "@/src/redux/features/dashboard/dashboardTypes";

interface TopPropertiesProps {
  properties: Property[];
}

export default function TopProperties({ properties }: TopPropertiesProps) {
  const topProperties = [...properties]
    .sort(
      (a, b) => (b.view_count ?? b.views ?? 0) - (a.view_count ?? a.views ?? 0),
    )
    .slice(0, 5);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-bold text-black">Top Properties</h3>

        <p className="mt-1 text-xs text-gray-500">
          Property listings and their available view counts
        </p>
      </div>

      {topProperties.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No properties available.
        </p>
      ) : (
        <div className="space-y-4">
          {topProperties.map((property) => {
            const views = property.view_count ?? property.views ?? 0;

            return (
              <article key={property.id} className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden 
                rounded-xl border border-gray-200 bg-gray-50">
                  {property.image_url ? (
                    <img
                      src={property.image_url}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-gray-500">
                      {property.title.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-bold text-black">
                    {property.title}
                  </h4>

                  <p className="mt-1 truncate text-[10px] text-gray-500">
                    {[property.city, property.district]
                      .filter(Boolean)
                      .join(", ") || "Location unavailable"}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs font-bold text-black">
                    {Number(property.price).toLocaleString()}
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    {views.toLocaleString()} views
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
