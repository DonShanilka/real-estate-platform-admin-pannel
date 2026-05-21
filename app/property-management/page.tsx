"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Icons } from "@/components/Icons";
import { PropertyCard } from "@/components/propertyComponents/PropertyCard";
import { PropertyFormModal } from "@/components/propertyComponents/PropertyFormModal";

import {
  propertyApi as api,
  Property,
  PropertyStatus,
  PropertyType,
} from "@/lib/api";

export default function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [activeTab, setActiveTab] = useState<
    "All" | "Active" | "Pending" | "Sold"
  >("All");

  const [categoryFilter, setCategoryFilter] =
    useState<string>("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] =
    useState<boolean>(false);

  const [editingProperty, setEditingProperty] =
    useState<Property | null>(null);

  // =========================================
  // FETCH PROPERTIES
  // =========================================
  const fetchProperties = async () => {
    try {
      setLoading(true);

      const data = await api.getAllProperties();

      if (Array.isArray(data)) {
        setProperties(data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Failed to load properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // =========================================
  // SEARCH
  // =========================================
  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  // =========================================
  // DELETE PROPERTY
  // =========================================
  const handleDelete = async (id: number) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this property listing?"
      );

      if (!confirmed) return;

      const success = await api.deleteProperty(id);

      if (success) {
        setProperties((prev) =>
          prev.filter((property) => property.id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  // =========================================
  // OPEN EDIT MODAL
  // =========================================
  const handleEditTrigger = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  // =========================================
  // SAVE UPDATED PROPERTY
  // =========================================
  const handleSaveProperty = async (
    updatedProperty: Property
  ) => {
    try {
      if (!updatedProperty.id) return;

      const savedProperty = await api.updateProperty(
        updatedProperty.id,
        updatedProperty
      );

      setProperties((prev) =>
        prev.map((property) =>
          property.id === savedProperty.id
            ? savedProperty
            : property
        )
      );

      setIsModalOpen(false);
      setEditingProperty(null);
    } catch (error) {
      console.error(
        "Failed to update property:",
        error
      );
    }
  };

  // =========================================
  // FILTER PROPERTIES
  // =========================================
  const filteredProperties = properties.filter((property) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      property.title.toLowerCase().includes(query) ||
      property.address?.toLowerCase().includes(query) ||
      property.city?.toLowerCase().includes(query) ||
      property.id?.toString().includes(query) ||
      property.property_type
        .toLowerCase()
        .includes(query);

    let matchesTab = true;

    if (activeTab === "Active") {
      matchesTab =
        property.status === PropertyStatus.AVAILABLE;
    }

    if (activeTab === "Pending") {
      matchesTab =
        property.status === PropertyStatus.RENTED;
    }

    if (activeTab === "Sold") {
      matchesTab =
        property.status === PropertyStatus.SOLD;
    }

    const matchesCategory =
      categoryFilter === "All" ||
      property.property_type === categoryFilter;

    return (
      matchesSearch &&
      matchesTab &&
      matchesCategory
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs text-zinc-400">
            Total properties cataloged:{" "}
            {properties.length} listings
          </p>
        </div>

        <Link
          href="/add-property"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-500/10 hover:shadow-lg hover:shadow-rose-500/20 hover:scale-[1.02] transition-all self-start sm:self-auto"
        >
          <Icons.Plus size={16} />
          Add Property Listing
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <div className="flex gap-2">
          {(
            ["All", "Active", "Pending", "Sold"] as const
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {tab === "Active"
                ? "Available"
                : tab === "Pending"
                ? "Rented"
                : tab === "Sold"
                ? "Sold"
                : "All Properties"}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-400 font-medium">
            Category:
          </label>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="px-2.5 py-1 bg-white border border-zinc-200 text-zinc-800 rounded-lg text-xs font-medium focus:outline-none dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
          >
            <option value="All">
              All Categories
            </option>

            <option value={PropertyType.VILLA}>
              Villas
            </option>

            <option value={PropertyType.APARTMENT}>
              Apartments
            </option>

            <option value={PropertyType.HOUSE}>
              Houses
            </option>

            <option value={PropertyType.LAND}>
              Land
            </option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Icons.Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          size={16}
        />

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title, listing ID, address, city or category type..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 text-zinc-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="p-12 text-center text-xs font-medium text-zinc-400">
          Syncing property catalog from cloud backend
          node...
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleEditTrigger}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-3 dark:bg-zinc-900 dark:border-zinc-800">
          <p className="text-sm font-semibold text-zinc-500">
            No properties found matching your
            criteria.
          </p>

          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTab("All");
              setCategoryFilter("All");
            }}
            className="text-xs text-rose-500 font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Edit Modal */}
      <PropertyFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProperty(null);
        }}
        property={editingProperty}
        onSave={handleSaveProperty}
      />
    </div>
  );
}