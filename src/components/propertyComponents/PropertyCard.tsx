"use client";

import React from "react";
import { Property, PropertyStatus } from "@/src/lib/api";

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: number) => void;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";

export function PropertyCard({
  property,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  console.log("PROPERTY RAW:", property);


  const price = Number(property?.price ?? 0);

  const formattedPrice =
    price >= 10000
      ? `$${price.toLocaleString()}`
      : `$${price.toLocaleString()}/mo`;

  const title = property?.title || "Untitled Property";
  const address = property?.address || "No Address";
  const city = property?.city || "Unknown City";
  const district = property?.district || "Unknown District";

  const bedrooms = Number(property?.bedrooms ?? 0);
  const bathrooms = Number(property?.bathrooms ?? 0);
  const areaSize = Number(property?.area_size ?? 0);

  const imageUrl =
    property?.image_url?.trim() || FALLBACK_IMAGE;


  const status = (property?.status || "").toUpperCase();

  let statusText = "Available";
  let statusClass = "bg-emerald-500 text-white";

  if (status === "RENTED") {
    statusText = "Rented";
    statusClass = "bg-amber-500 text-white";
  } else if (status === "SOLD") {
    statusText = "Sold";
    statusClass = "bg-zinc-700 text-white dark:bg-zinc-800";
  }


  const type = (property?.property_type || "").toUpperCase();

  const typeText =
    type === "APARTMENT"
      ? "Apartment"
      : type === "HOUSE"
      ? "House"
      : type === "VILLA"
      ? "Villa"
      : type === "LAND"
      ? "Land"
      : "Property";

  const typeClass =
    status === "RENTED" ? "bg-amber-500" : "bg-rose-500";


  const ownerId = Number(property?.owner_id ?? 0);

  const agentName =
    ownerId === 1
      ? "Sarah Jenkins"
      : ownerId === 2
      ? "Alex Rivera"
      : "Emma Watson";

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-300 transition-all flex flex-col group dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700">

      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* BADGES */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold text-white ${typeClass}`}>
            {typeText}
          </span>

          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${statusClass}`}>
            {statusText}
          </span>
        </div>

        {/* PRICE */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-[10px] text-zinc-300 font-mono">
            #{property?.id ?? "N/A"}
          </span>

          <div className="text-lg font-extrabold text-white">
            {formattedPrice}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-5 space-y-4">

        {/* INFO */}
        <div>
          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">
            {typeText}
          </span>

          <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">
            {title}
          </h4>

          <p className="text-xs text-zinc-400 line-clamp-1">
            {address}, {city}, {district}
          </p>
        </div>

        {/* SPECS */}
        <div className="flex gap-4 text-xs text-zinc-500 py-2 border-y border-zinc-100 dark:border-zinc-800">
          <span>🛏 {bedrooms} Beds</span>
          <span>🛁 {bathrooms} Baths</span>
          <span>📐 {areaSize} sqft</span>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center text-xs">

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[9px] font-bold">
              {agentName.slice(0, 2)}
            </div>

            <span className="text-zinc-600 dark:text-zinc-300">
              {agentName}
            </span>
          </div>

          <div className="flex gap-1">

            <button
              onClick={() => onEdit(property)}
              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
            >
              ✏️
            </button>

            <button
              onClick={() => property?.id && onDelete(property.id)}
              className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg"
            >
              🗑️
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}