"use client";

import { useEffect, useState } from "react";

import { Property } from "@/src/types/propertyTypes";

import PropertyHeader from "@/src/components/propertyComponents/PropertyHeader";
import PropertyFilters from "@/src/components/propertyComponents/PropertyFilters";
import PropertyGrid from "@/src/components/propertyComponents/PropertyGrid";
import PropertyLoading from "@/src/components/propertyComponents/PropertyLoading";
import PropertyEmptyState from "@/src/components/propertyComponents/PropertyEmptyState";
import { PropertyFormModal } from "@/src/components/propertyComponents/PropertyFormModal";

import { filterProperties } from "@/src/utils/propertyFilter";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";

import {
  fetchProperties,
  createPropertyThunk,
  updatePropertyThunk,
  deletePropertyThunk,
} from "@/src/redux/features/property/propertyThunk";

export default function PropertyManagement() {
  
  const dispatch = useAppDispatch();

  const { properties, loading } = useAppSelector((state) => state.property);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Pending" | "Sold">("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const filteredProperties = filterProperties(
    properties,
    searchQuery,
    activeTab,
    categoryFilter,
  );

  const handleDelete = async (id: number) => {
    dispatch(deletePropertyThunk(id));
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleSave = async (propertyData: Property) => {
    try {
      if (editingProperty) {
        await dispatch(
          updatePropertyThunk({
            id: editingProperty.id!,
            property: propertyData,
          }),
        ).unwrap();
      } else {
        await dispatch(createPropertyThunk(propertyData)).unwrap();
      }

      setIsModalOpen(false);
      setEditingProperty(null);

      dispatch(fetchProperties());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <PropertyHeader total={properties.length} onAddProperty={handleCreate} />

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
        onClose={() => {
          setIsModalOpen(false);
          setEditingProperty(null);
        }}
        property={editingProperty}
        onSave={handleSave}
      />
    </div>
  );
}
