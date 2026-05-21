import {
  Property,
  PropertyStatus,
} from "@/lib/api";

export const filterProperties = (
  properties: Property[],
  searchQuery: string,
  activeTab: string,
  categoryFilter: string
) => {
  return properties.filter((p) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      p.title?.toLowerCase().includes(query) ||
      p.address?.toLowerCase().includes(query) ||
      p.city?.toLowerCase().includes(query) ||
      p.property_type?.toLowerCase().includes(query) ||
      p.id?.toString().includes(query);

    let matchesTab = true;

    switch (activeTab) {
      case "Active":
        matchesTab =
          p.status === PropertyStatus.AVAILABLE;
        break;

      case "Pending":
        matchesTab =
          p.status === PropertyStatus.RENTED;
        break;

      case "Sold":
        matchesTab =
          p.status === PropertyStatus.SOLD;
        break;
    }

    const matchesCategory =
      categoryFilter === "All" ||
      p.property_type === categoryFilter;

    return (
      matchesSearch &&
      matchesTab &&
      matchesCategory
    );
  });
};