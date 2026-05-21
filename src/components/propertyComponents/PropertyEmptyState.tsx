interface Props {
  resetFilters: () => void;
}

export default function PropertyEmptyState({
  resetFilters,
}: Props) {
  return (
    <div className="text-center p-12">
      <p>No properties found.</p>

      <button
        onClick={resetFilters}
        className="text-blue-600"
      >
        Reset Filters
      </button>
    </div>
  );
}