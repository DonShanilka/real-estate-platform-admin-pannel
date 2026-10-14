"use client";

import React, { useState } from "react";
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
  const [imageFailed, setImageFailed] = useState(false);

  const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";

  const imageUrl =
    property.image_url?.trim() && !imageFailed
      ? property.image_url.trim()
      : FALLBACK_IMAGE;

  const price = Number(property.price ?? 0);

  const formattedPrice =
    price >= 10000
      ? `$${price.toLocaleString()}`
      : `$${price.toLocaleString()}/mo`;

  const propertyType = property.property_type
    ? property.property_type.charAt(0) +
      property.property_type.slice(1).toLowerCase()
    : "Property";

  const location = [property.city, property.district]
    .filter(Boolean)
    .join(", ");

  const statusConfig: Record<string, { label: string; className: string }> = {
    AVAILABLE: {
      label: "Available",
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    RENTED: {
      label: "Rented",
      className: "border-amber-200 bg-amber-50 text-amber-700",
    },
    SOLD: {
      label: "Sold",
      className: "border-zinc-200 bg-zinc-100 text-zinc-700",
    },
  };

  const status = statusConfig[property.status] ?? statusConfig.AVAILABLE;

  return (
    <article
      className="group flex h-full min-w-0 cursor-default flex-col rounded-3xl
     border border-slate-100 bg-white p-3 transition duration-300 hover:border-slate-200 hover:shadow-lg sm:p-4"
    >
      {/* PROPERTY IMAGE */}
      <div className="relative aspect-[1.46] w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={imageUrl}
          alt={property.title}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        {/* Property type */}
        <span
          className="absolute left-3 top-3 rounded-full border border-white/70
         bg-white/95 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm"
        >
          {propertyType}
        </span>

        {/* Property status */}
        <span
          className={`absolute right-3 top-3 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>

        {/* Property ID */}
        <span
          className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5
         text-xs font-medium text-white backdrop-blur-sm"
        >
          Property #{property.id}
        </span>
      </div>

      {/* PROPERTY CONTENT */}
      <div className="flex min-w-0 flex-1 flex-col pt-4">
        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
          {property.title}
        </h3>

        {/* Location */}
        <p className="mt-1 line-clamp-1 text-sm text-slate-500">
          <span aria-hidden="true">📍 </span>
          {[property.address, property.city, property.district]
            .filter(Boolean)
            .join(", ") || "Location unavailable"}
        </p>

        {/* Property details */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            property.bedrooms != null ? `${property.bedrooms} bedrooms` : null,
            property.bathrooms != null
              ? `${property.bathrooms} bathrooms`
              : null,
            property.area_size
              ? `${Number(property.area_size).toLocaleString()} sq.ft`
              : null,
          ]
            .filter((item): item is string => Boolean(item))
            .map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 sm:text-sm"
              >
                {item}
              </span>
            ))}
        </div>

        {/* Description */}
        <p className="mt-4 min-h-12 line-clamp-2 text-sm leading-6 text-slate-600">
          {property.description ||
            `Explore ${property.title}${location ? ` in ${location}` : ""}.`}
        </p>

        {/* Price and Actions */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="min-w-0">
            <p className="text-xs text-slate-500">Listed price</p>
            <p className="mt-1 truncate text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
              {formattedPrice}
            </p>
          </div>

          {/* Admin Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(property)}
              aria-label={`Edit ${property.title}`}
              title="Edit property"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200
               bg-white text-slate-600 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => property.id && onDelete(property.id)}
              aria-label={`Delete ${property.title}`}
              title="Delete property"
              className="grid h-10 w-10 place-items-center rounded-full border border-red-100
               bg-white text-red-500 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="m19 6-1 14H6L5 6" />
                <path d="M10 11v5M14 11v5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
