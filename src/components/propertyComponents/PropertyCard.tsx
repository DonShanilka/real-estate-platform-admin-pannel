"use client";

import React from "react";
import { Property } from "@/src/types/propertyTypes";

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: number) => void;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";

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

  const imageUrl = property.image_url?.trim() || FALLBACK_IMAGE;

  const status = property.status;

  const statusConfig = {
    AVAILABLE: {
      text: "Available",
      className: "bg-emerald-500 text-white",
    },
    RENTED: {
      text: "Rented",
      className: "bg-amber-500 text-white",
    },
    SOLD: {
      text: "Sold",
      className: "bg-zinc-700 text-white",
    },
  };

  const currentStatus = statusConfig[status] ?? statusConfig.AVAILABLE;

  const typeText =
    property.property_type.charAt(0) +
    property.property_type.slice(1).toLowerCase();

  const ownerId = property.owner_id ?? 0;

  const agentName =
    ownerId === 1
      ? "Sarah Jenkins"
      : ownerId === 2
        ? "Alex Rivera"
        : "Emma Watson";

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-300 transition-all flex flex-col group dark:bg-zinc-900 dark:border-zinc-800">
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
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

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">
            {property.title}
          </h3>

          <p className="text-xs text-zinc-500 line-clamp-1">
            {property.address}, {property.city}, {property.district}
          </p>

          <div className="flex gap-4 text-xs text-zinc-500 mt-4">
            <span>🛏 {property.bedrooms}</span>
            <span>🛁 {property.bathrooms}</span>
            <span>📐 {property.area_size} sqft</span>
          </div>
        </div>

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
