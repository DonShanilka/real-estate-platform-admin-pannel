"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";

export default function AddProperty() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "For Sale",
    category: "Villa",
    beds: "3",
    baths: "2",
    sqft: "1500",
    address: "",
    city: "",
    state: "",
    zip: "",
    amenities: [] as string[],
  });

  const amenitiesList = ["Swimming Pool", "Fitness Gym", "24/7 Security", "Private Parking", "Lush Garden", "High-speed Wifi", "Central AC", "Fireplace"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (amenity: string) => {
    const isSelected = formData.amenities.includes(amenity);
    const updated = isSelected
      ? formData.amenities.filter((item) => item !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: updated });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              Your property &ldquo;{formData.title || "Untitled Property"}&rdquo; has been registered and is now listed with status <span className="font-semibold text-emerald-600">Active</span> on the platform.
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
                  price: "",
                  type: "For Sale",
                  category: "Villa",
                  beds: "3",
                  baths: "2",
                  sqft: "1500",
                  address: "",
                  city: "",
                  state: "",
                  zip: "",
                  amenities: [],
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
              /* Step 1: General Info */
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
                    required
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
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Listing Price</label>
                    <input
                      type="text"
                      required
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g. $850,000 or $3,500/mo"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Listing Mode</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Category Typology</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="House">House</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              /* Step 2: Location & Size */
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
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">State / Region</label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="FL"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Zip Code</label>
                    <input
                      type="text"
                      required
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="33101"
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
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Bathrooms</label>
                    <input
                      type="number"
                      required
                      name="baths"
                      value={formData.baths}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Area Sqft</label>
                    <input
                      type="number"
                      required
                      name="sqft"
                      value={formData.sqft}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              /* Step 3: Amenities & Photos */
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Select Included Amenities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {amenitiesList.map((amenity) => {
                      const isChecked = formData.amenities.includes(amenity);
                      return (
                        <button
                          type="button"
                          key={amenity}
                          onClick={() => handleCheckboxChange(amenity)}
                          className={`p-2.5 text-xs font-semibold rounded-xl border text-center transition-all ${
                            isChecked
                              ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                              : "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {amenity}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Drag and Drop Zone Simulator */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Upload Property Media</label>
                  <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center hover:border-zinc-300 transition-all dark:border-zinc-700 dark:hover:border-zinc-600">
                    <svg className="w-8 h-8 text-zinc-400 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Drag images here or browse files</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Supports high-res PNG, JPG up to 10MB</span>
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
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-semibold rounded-xl hover:opacity-90 shadow-md shadow-rose-500/10 transition-all ml-auto"
                >
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
