"use client";

import React, { useState, useEffect } from "react";
import { Property, PropertyType, PropertyStatus } from "@/src/lib/api";
import Input from "../ui/Input";

interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null; // Null means creating, otherwise updating
  onSave: (property: Property) => void;
}

export function PropertyFormModal({
  isOpen,
  onClose,
  property,
  onSave,
}: PropertyFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    property_type: PropertyType.VILLA,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 0,
    bathrooms: 0,
    area_size: 0,
    address: "",
    city: "",
    district: "",
    country: "USA",
    latitude: 0,
    longitude: 0,
    owner_id: 1,
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [image, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        description: property.description || "",
        price: property.price || 0,
        property_type: property.property_type || PropertyType.VILLA,
        status: property.status || PropertyStatus.AVAILABLE,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area_size: property.area_size || 0,
        address: property.address || "",
        city: property.city || "",
        district: property.district || "",
        country: property.country || "USA",
        latitude: property.latitude || 0,
        longitude: property.longitude || 0,
        owner_id: property.owner_id || 1,
      });
    }
  }, [property]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const numberFields = [
      "price",
      "bedrooms",
      "bathrooms",
      "area_size",
      "latitude",
      "longitude",
      "owner_id",
    ];
    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      ...property,
      ...formData,
      id: property?.id,
    } as Property);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header visual details */}
        <div className="bg-zinc-950 text-white p-5 border-b border-zinc-850 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-rose-500">
              {property
                ? "Update Property Listing"
                : "Register Property Listing"}
            </h3>
            <p className="text-[10px] text-zinc-400 mt-0.5">
              {property
                ? `Listing ID: #${property.id}`
                : "Provide details for the new listing"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable form content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* General Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              1. General Details
            </h4>
            <Input
              lable="Property Title"
              type="text"
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Oceanfront Glass Penthouse"
            />

            {/* <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                Property Title
              </label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Oceanfront Glass Penthouse"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div> */}

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Narrative summary highlighting unique features, sights..."
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Price ($)
                </label>
                <input
                  type="number"
                  required
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Property Type
                </label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                >
                  <option value={PropertyType.APARTMENT}>Apartment</option>
                  <option value={PropertyType.HOUSE}>House</option>
                  <option value={PropertyType.LAND}>Land</option>
                  <option value={PropertyType.VILLA}>Villa</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Availability Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                >
                  <option value={PropertyStatus.AVAILABLE}>Available</option>
                  <option value={PropertyStatus.SOLD}>Sold</option>
                  <option value={PropertyStatus.RENTED}>Rented</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-zinc-150 dark:bg-zinc-800"></div>

          {/* Location details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              2. Address & Geolocation
            </h4>
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                Street Address
              </label>
              <input
                type="text"
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. 102 Ocean Drive"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  City
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  District
                </label>
                <input
                  type="text"
                  required
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Country
                </label>
                <input
                  type="text"
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Owner ID
                </label>
                <input
                  type="number"
                  required
                  name="owner_id"
                  value={formData.owner_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Latitude (optional)
                </label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Longitude (optional)
                </label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-zinc-150 dark:bg-zinc-800"></div>

          {/* Size & details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              3. Size & Capacity Parameters
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Bedrooms
                </label>
                <input
                  type="number"
                  required
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Bathrooms
                </label>
                <input
                  type="number"
                  required
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Area size (sqft)
                </label>
                <input
                  type="number"
                  required
                  name="area_size"
                  value={formData.area_size}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-zinc-150 dark:bg-zinc-800"></div>

          {/* Media Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              4. Media Uploads
            </h4>

            {/* IMAGE */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                Property Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={setImageFile as any}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium
      file:mr-4 file:px-3 file:py-1.5 file:border-0
      file:bg-blue-600 file:text-white file:rounded-lg
      dark:bg-zinc-800 dark:border-zinc-700"
              />

              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg border"
                />
              )}
            </div>

            {/* VIDEO */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                Property Video
              </label>

              <input
                type="file"
                accept="video/*"
                onChange={setVideoFile as any}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium
      file:mr-4 file:px-3 file:py-1.5 file:border-0
      file:bg-green-600 file:text-white file:rounded-lg
      dark:bg-zinc-800 dark:border-zinc-700"
              />

              {formData.video_url && (
                <video controls className="w-full rounded-lg border">
                  <source src={formData.video_url} />
                </video>
              )}
            </div>
          </div>
        </form>

        {/* Footer controls action */}
        <div className="bg-zinc-50 px-6 py-4 border-t border-zinc-200 flex justify-end gap-3 shrink-0 dark:bg-zinc-850 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-zinc-200 dark:border-zinc-750 text-xs font-semibold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-bold rounded-xl hover:opacity-90 shadow-md shadow-rose-500/10 transition-all"
          >
            Save Listing
          </button>
        </div>
      </div>
    </div>
  );
}
