"use client";

import { Property } from "@/src/types/propertyTypes";
import PropertyCard from "./PropertyCard";

interface Props {
  properties: Property[];

  onEdit: (property: Property) => void;

  onDelete: (id: number) => void;
}

export default function PropertyGrid({ properties, onEdit, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
