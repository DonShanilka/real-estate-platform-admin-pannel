"use client";

import React from "react";
import { Property } from "@/src/types/propertyTypes";

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: number) => void;
}

export default function PropertyCard({
  property,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  const price = Number(property.price ?? 0);

  const formattedPrice =
    price >= 10000
      ? `$${price.toLocaleString()}`
      : `$${price.toLocaleString()}/mo`;

  const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";

  function normalizeImageUrl(url?: string) {
    if (!url) return "";

    return url.trim().replace(/["']/g, "").replace(/\s/g, "");
  }

  const rawImageUrl = normalizeImageUrl(property.image_url);

  // IMPORTANT: do NOT convert to base64 (you are NOT using base64)
  const imageUrl = rawImageUrl || FALLBACK_IMAGE;

  const statusConfig: Record<string, { text: string; className: string }> = {
    AVAILABLE: { text: "Available", className: "bg-emerald-500 text-white" },
    RENTED: { text: "Rented", className: "bg-amber-500 text-white" },
    SOLD: { text: "Sold", className: "bg-zinc-700 text-white" },
  };

  const currentStatus = statusConfig[property.status] ?? statusConfig.AVAILABLE;

  const typeText =
    property.property_type.charAt(0) +
    property.property_type.slice(1).toLowerCase();

  const agentName =
    property.owner_id === 1
      ? "Sarah Jenkins"
      : property.owner_id === 2
        ? "Alex Rivera"
        : "Emma Watson";

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group dark:bg-zinc-900 dark:border-zinc-800">
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={imageUrl}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            console.error("Image failed (Backblaze issue):", imageUrl);
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <span className="px-2 py-1 rounded text-[10px] font-semibold bg-blue-600 text-white">
            {typeText}
          </span>

          <span
            className={`px-2 py-1 rounded text-[10px] font-semibold ${currentStatus.className}`}
          >
            {currentStatus.text}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 z-10">
          <p className="text-[10px] text-zinc-300">#{property.id}</p>
          <h3 className="text-xl font-bold text-white">{formattedPrice}</h3>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-bold text-sm line-clamp-1 dark:text-white">
            {property.title}
          </h3>

          <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
            {property.address}, {property.city}, {property.district},{" "}
            {property.country}
          </p>

          <div className="grid grid-cols-3 gap-2 text-xs text-zinc-500 mt-4">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-2 text-center">
              <div className="font-semibold">{property.bedrooms}</div>
              <div>Bedrooms</div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-2 text-center">
              <div className="font-semibold">{property.bathrooms}</div>
              <div>Bathrooms</div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-2 text-center">
              <div className="font-semibold">{property.area_size}</div>
              <div>Sqft</div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-zinc-500">
            📍 {property.latitude}, {property.longitude}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold">
              {agentName.slice(0, 2)}
            </div>
            <span className="text-xs text-zinc-600">{agentName}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(property)}
              className="px-2 py-1 rounded hover:bg-zinc-100"
            >
              ✏️
            </button>

            <button
              onClick={() => property.id && onDelete(property.id)}
              className="px-2 py-1 rounded hover:bg-red-50 text-red-500"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
