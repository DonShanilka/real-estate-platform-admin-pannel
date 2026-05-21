"use client";

import { useState } from "react";

import { Property } from "@/src/lib/api";
import { propertyApi } from "@/src/lib/api";

import PropertyHeader from "@/src/components/propertyComponents/PropertyHeader";
import PropertyFilters from "@/src/components/propertyComponents/PropertyFilters";
import PropertyGrid from "@/src/components/propertyComponents/PropertyGrid";
import PropertyLoading from "@/src/components/propertyComponents/PropertyLoading";
import PropertyEmptyState from "@/src/components/propertyComponents/PropertyEmptyState";

import { PropertyFormModal } from "@/src/components/propertyComponents/PropertyFormModal";

import { useProperties } from "@/src/hooks/useProperties";

import { filterProperties } from "@/src/utils/propertyFilter";

export default function PropertyManagement() {
  const { properties, setProperties, loading } = useProperties();

  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState<
    "All" | "Active" | "Pending" | "Sold"
  >("All");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProperties = filterProperties(
    properties,
    searchQuery,
    activeTab,
    categoryFilter,
  );

  const handleDelete = async (id: number) => {
    await propertyApi.deleteProperty(id);

    setProperties((prev: any) => prev.filter((p: any) => p.id !== id));
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PropertyHeader total={properties.length} />

      <PropertyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {loading ? (
        <PropertyLoading />
      ) : filteredProperties.length > 0 ? (
        <PropertyGrid
          properties={filteredProperties}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <PropertyEmptyState
          resetFilters={() => {
            setSearchQuery("");
            setActiveTab("All");
            setCategoryFilter("All");
          }}
        />
      )}

      <PropertyFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={editingProperty}
        onSave={() => {}}
      />
    </div>
  );
}
