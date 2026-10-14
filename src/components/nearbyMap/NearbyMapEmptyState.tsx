export default function NearbyMapEmptyState() {
  return (
    <div className="m-auto max-w-xs bg-white px-6 py-12 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border
       border-zinc-200 bg-white text-2xl text-zinc-700">
        ⌖
      </div>

      <p className="mt-4 font-semibold text-black">
        No properties in this area
      </p>

      <p className="mt-1 text-sm leading-6 text-zinc-500">
        Try a wider radius, move the map, or search around your
        current location.
      </p>
    </div>
  );
}