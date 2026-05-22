"use client";

import React, { useState } from "react";
import Link from "next/link";
// import {
//   Property,
//   propertyApi as api,
//   PropertyStatus,
//   PropertyType,
// } from "@/src/lib/api";

export default function AddProperty() {
  // const [step, setStep] = useState(1);
  // const [submitted, setSubmitted] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   price: 0,
  //   property_type: PropertyType.VILLA,
  //   status: PropertyStatus.AVAILABLE,
  //   bedrooms: 3,
  //   bathrooms: 2,
  //   area_size: 1500,
  //   address: "",
  //   city: "",
  //   district: "",
  //   country: "USA",
  //   latitude: 0,
  //   longitude: 0,
  //   owner_id: 1,
  //   image_url: "",
  //   video_url: "",
  // });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   const numberFields = ["price", "bedrooms", "bathrooms", "area_size", "latitude", "longitude", "owner_id"];
  //   setFormData({ ...formData, [name]: numberFields.includes(name) ? parseFloat(value) || 0 : value });
  // };

  // const handleFormSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const payload: Omit<Property, "id"> = {
  //       title: formData.title,
  //       description: formData.description || null,
  //       price: formData.price,
  //       property_type: formData.property_type,
  //       status: formData.status,
  //       bedrooms: formData.bedrooms,
  //       bathrooms: formData.bathrooms,
  //       area_size: formData.area_size,
  //       address: formData.address,
  //       city: formData.city,
  //       district: formData.district,
  //       country: formData.country,
  //       latitude: formData.latitude || null,
  //       longitude: formData.longitude || null,
  //       owner_id: formData.owner_id,
  //       image_url: formData.image_url,
  //       video_url: formData.video_url,
  //     };

  //     const saved = await api.saveProperty(payload);
  //     if (saved) {
  //       setSubmitted(true);
  //     }
  //   } catch (err) {
  //     console.error("Failed to submit property listing:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {submitted ? (
        /* Success Screen */
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 text-center space-y-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto dark:bg-emerald-950/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Property Listing Created Successfully!</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Your property &ldquo;{formData.title || "Untitled Property"}&rdquo; has been registered and is now listed with status <span className="font-semibold text-emerald-600">{formData.status}</span> on the platform cloud backend.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Link
              href="/property-management"
              className="px-4 py-2 border border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 text-xs font-semibold rounded-xl transition-all"
            >
              Back to Catalog
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFormData({
                  title: "",
                  description: "",
                  price: 0,
                  property_type: PropertyType.VILLA,
                  status: PropertyStatus.AVAILABLE,
                  bedrooms: 3,
                  bathrooms: 2,
                  area_size: 1500,
                  address: "",
                  city: "",
                  district: "",
                  country: "USA",
                  latitude: 0,
                  longitude: 0,
                  owner_id: 1,
                  image_url: "",
                  video_url: "",
                });
              }}
              className="px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold rounded-xl hover:opacity-90 transition-all"
            >
              Add Another Listing
            </button>
          </div>
        </div>
      ) : (
        /* Wizard Form */
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          {/* Header Progress Indicators */}
          <div className="bg-zinc-950 text-white p-6 border-b border-zinc-800 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold">Register New Property</h2>
              <p className="text-[10px] text-zinc-400 mt-0.5">Step {step} of 3 • Enter accurate details for catalog sync</p>
            </div>

            {/* Stepper Indicators */}
            <div className="flex gap-1.5">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step >= num ? "w-6 bg-rose-500" : "w-2 bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
            {step === 1 && (
              /* General Info */
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Property Title</label>
                  <input
                    type="text"
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Modernist Forest Oasis Villa"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide a comprehensive narrative about the real estate listing features, surrounding neighborhoods..."
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Listing Price ($)</label>
                    <input
                      type="number"
                      required
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g. 850000"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Owner ID</label>
                    <input
                      type="number"
                      required
                      name="owner_id"
                      value={formData.owner_id}
                      onChange={handleInputChange}
                      placeholder="e.g. 1"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Property Type</label>
                    <select
                      name="property_type"
                      value={formData.property_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    >
                      <option value={PropertyType.APARTMENT}>Apartment</option>
                      <option value={PropertyType.HOUSE}>House</option>
                      <option value={PropertyType.LAND}>Land</option>
                      <option value={PropertyType.VILLA}>Villa</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Availability Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    >
                      <option value={PropertyStatus.AVAILABLE}>Available</option>
                      <option value={PropertyStatus.SOLD}>Sold</option>
                      <option value={PropertyStatus.RENTED}>Rented</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              /* Location & Size */
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Street Address</label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 102 Sunset Boulevard"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">City</label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Miami"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">District / County</label>
                    <input
                      type="text"
                      required
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="Miami-Dade"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Country</label>
                    <input
                      type="text"
                      required
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="USA"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Bedrooms</label>
                    <input
                      type="number"
                      required
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Bathrooms</label>
                    <input
                      type="number"
                      required
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Area size (sqft)</label>
                    <input
                      type="number"
                      required
                      name="area_size"
                      value={formData.area_size}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              /* Step 3: Media & Coordinates */
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Image URL</label>
                  <input
                    type="text"
                    required
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="http://domain.com/photo.jpg"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Video Walkthrough URL</label>
                  <input
                    type="text"
                    required
                    name="video_url"
                    value={formData.video_url}
                    onChange={handleInputChange}
                    placeholder="http://domain.com/walkthrough.mp4"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Latitude (optional)</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="e.g. 25.7617"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Longitude (optional)</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="e.g. -80.1918"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Wizard Controls */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 border border-zinc-200 hover:border-zinc-300 text-xs font-semibold rounded-xl transition-all dark:border-zinc-850"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold rounded-xl hover:opacity-90 transition-all ml-auto"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-semibold rounded-xl hover:opacity-90 shadow-md shadow-rose-500/10 transition-all ml-auto flex items-center gap-2"
                >
                  {loading && (
                    <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  Submit Listing
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
