"use client";

import React from "react";

import {
  Property,
  PropertyStatus,
} from "@/lib/api";

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: number) => void;
}

export function PropertyCard({
  property,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  // =========================================
  // SAFE VALUES
  // =========================================

  const safePrice = Number(property.price || 0);

  const formattedPrice =
    safePrice >= 10000
      ? `$${safePrice.toLocaleString()}`
      : `$${safePrice.toLocaleString()}/mo`;

  // =========================================
  // STATUS UI
  // =========================================

  let statusText = "Available";
  let statusClass =
    "bg-emerald-500 text-white";

  if (
    property.status === PropertyStatus.RENTED
  ) {
    statusText = "Rented";
    statusClass =
      "bg-amber-500 text-white";
  } else if (
    property.status === PropertyStatus.SOLD
  ) {
    statusText = "Sold";
    statusClass =
      "bg-zinc-700 text-white dark:bg-zinc-800";
  }

  // =========================================
  // TYPE TAG
  // =========================================

  const typeText =
    property.status === PropertyStatus.RENTED
      ? "For Rent"
      : "For Sale";

  const typeClass =
    property.status === PropertyStatus.RENTED
      ? "bg-amber-500"
      : "bg-rose-500";

  // =========================================
  // AGENT NAME
  // =========================================

  const agentName =
    property.owner_id === 1
      ? "Sarah Jenkins"
      : property.owner_id === 2
      ? "Alex Rivera"
      : "Emma Watson";

  // =========================================
  // IMAGE
  // =========================================

  const imageUrl =
    property.image_url &&
    property.image_url.trim() !== ""
      ? property.image_url
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-300 transition-all flex flex-col group dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700">
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title || "Property"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* TOP BADGES */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider text-white ${typeClass}`}
          >
            {typeText}
          </span>

          <span
            className={`px-2 py-0.5 rounded text-[9px] font-bold ${statusClass}`}
          >
            {statusText}
          </span>
        </div>

        {/* PRICE */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-[10px] text-zinc-300 font-mono block">
            #{property.id ?? "N/A"}
          </span>

          <span className="text-lg font-extrabold text-white">
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* INFO */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">
            {property.property_type || "PROPERTY"}
          </span>

          <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-rose-500 transition-colors">
            {property.title || "Untitled Property"}
          </h4>

          <p className="text-xs text-zinc-400 font-medium line-clamp-1">
            {property.address || "No Address"},{" "}
            {property.city || "Unknown City"},{" "}
            {property.district || "Unknown District"}
          </p>
        </div>

        {/* SPECS */}
        <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 py-2 border-y border-zinc-50 dark:border-zinc-800/50">
          <span className="flex items-center gap-1">
            🛏 {property.bedrooms ?? 0} Beds
          </span>

          <span className="flex items-center gap-1">
            🛁 {property.bathrooms ?? 0} Baths
          </span>

          <span className="flex items-center gap-1">
            📐 {property.area_size ?? 0} sqft
          </span>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between gap-2 pt-1 text-xs">
          {/* AGENT */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-[9px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {agentName.substring(0, 2)}
            </div>

            <span className="font-semibold text-zinc-600 dark:text-zinc-300 truncate max-w-[80px]">
              {agentName}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-1">
            {/* EDIT */}
            <button
              type="button"
              onClick={() => onEdit(property)}
              className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-all dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
              title="Edit property"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>

            {/* DELETE */}
            <button
              type="button"
              onClick={() => {
                if (property.id) {
                  onDelete(property.id);
                }
              }}
              className="p-1.5 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-all dark:hover:bg-rose-950/20"
              title="Delete property"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}