"use client";

import React, { useState, useEffect } from "react";
import {
  Property,
  PropertyType,
  PropertyStatus,
} from "@/src/types/propertyTypes";
import Input from "../ui/core/Input";
import Select from "../ui/core/Select";
import Textarea from "../ui/core/Textarea";
import FileInput from "../ui/core/FileInput";
import ModalHeader from "../ui/from/ModalHeader";
import ModalFooter from "../ui/from/ModalFooter";

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
  const defaultFormData = {
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
    country: "Sri Lanka",
    latitude: null as number | null,
    longitude: null as number | null,
    owner_id: 1,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isEdit = Boolean(property?.id);

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
        country: property.country || "Sri Lanka",
        latitude: property.latitude ?? null,
        longitude: property.longitude ?? null,
        owner_id: property.owner_id || 1,
      });
    } else {
      setFormData(defaultFormData);
      setImageFile(null);
      setVideoFile(null);
    }
  }, [property, isOpen]);

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
    const coordinateField = name === "latitude" || name === "longitude";
    setFormData((prev) => ({
      ...prev,
      [name]: coordinateField
        ? value.trim() === "" ? null : parseFloat(value)
        : numberFields.includes(name) ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const data = new FormData();

  data.append("title", formData.title);
  data.append("description", formData.description);

  data.append("price", String(formData.price));

  data.append("property_type", formData.property_type);
  data.append("status", formData.status);

  data.append("bedrooms", String(formData.bedrooms));
  data.append("bathrooms", String(formData.bathrooms));
  data.append("area_size", String(formData.area_size));

  data.append("address", formData.address);
  data.append("city", formData.city);
  data.append("district", formData.district);
  data.append("country", formData.country);

  if (formData.latitude !== null && formData.longitude !== null) {
    data.append("latitude", String(formData.latitude));
    data.append("longitude", String(formData.longitude));
  }

  data.append("owner_id", String(formData.owner_id));

  if (imageFile) {
    data.append("image", imageFile);
  }

  if (videoFile) {
    data.append("video", videoFile);
  }

  onSave(data as any);

  for (const pair of data.entries()) {
  console.log(pair[0], pair[1]);
}

  console.log("IMAGE FILE:", imageFile);
console.log("VIDEO FILE:", videoFile);

console.log(imageFile instanceof File);
console.log(videoFile instanceof File);
};

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header visual details */}
        <ModalHeader
          title={
            property ? "Update Property Listing" : "Register Property Listing"
          }
          subtitle={
            property
              ? `Listing ID: #${property.id}`
              : "Provide details for the new listing"
          }
          onClose={onClose}
        />

        {/* Scrollable form content */}
        <form
          onSubmit={handleSubmit as any}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* General Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              1. General Details
            </h4>
            <Input
              label="Property Title"
              type="text"
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Oceanfront Glass Penthouse"
            />

            <Textarea
              label="Description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Narrative summary highlighting unique features, sights..."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Price ($)"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <Select
                label="Property Type"
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                options={[
                  { label: "Apartment", value: PropertyType.APARTMENT },
                  { label: "House", value: PropertyType.HOUSE },
                  { label: "Land", value: PropertyType.LAND },
                  { label: "Villa", value: PropertyType.VILLA },
                ]}
              />

              <Select
                label="Availability Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { label: "Available", value: PropertyStatus.AVAILABLE },
                  { label: "Sold", value: PropertyStatus.SOLD },
                  { label: "Rented", value: PropertyStatus.RENTED },
                ]}
              />
            </div>
          </div>

          <div className="w-full h-px bg-zinc-150 dark:bg-zinc-800"></div>

          {/* Location details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              2. Address & Geolocation
            </h4>

            <Input
              label="Street Address"
              type="text"
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 102 Ocean Drive"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Input
                label="City"
                type="text"
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <Input
                label="District"
                type="text"
                required
                name="district"
                value={formData.district}
                onChange={handleChange}
              />

              <Input
                label="Country"
                type="text"
                required
                name="country"
                value={formData.country}
                onChange={handleChange}
              />

              <Input
                label="Owner ID"
                type="number"
                required
                name="owner_id"
                value={formData.owner_id}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Latitude (optional)"
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude ?? ""}
                onChange={handleChange}
              />

              <Input
                label="Longitude (optional)"
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full h-px bg-zinc-150 dark:bg-zinc-800"></div>

          {/* Size & details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              3. Size & Capacity Parameters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Bedrooms"
                type="number"
                required
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
              />

              <Input
                label="Bathrooms"
                type="number"
                required
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
              />

              <Input
                label="Area size (sqft)"
                type="number"
                required
                name="area_size"
                value={formData.area_size}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full h-px bg-zinc-150 dark:bg-zinc-800"></div>

          {/* Media Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              4. Media Uploads
            </h4>

            {/* IMAGE */}
            <FileInput
              label="Property Image"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImageFile(e.target.files?.[0] || null)
              }
            />

            <FileInput
              label="Property Video"
              accept="video/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVideoFile(e.target.files?.[0] || null)
              }
            />
          </div>
        </form>

        {/* Footer controls action */}
        <ModalFooter
          onClose={onClose as any}
          onSubmit={handleSubmit as any}
          submitText="Save Listing"
        />
      </div>
    </div>
  );
}
