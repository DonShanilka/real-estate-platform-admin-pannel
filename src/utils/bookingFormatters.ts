// ISO datetime string to display date: "2026-06-01" -> "Jun 1, 2026"
export function formatDate(isoString: string): string {
  if (!isoString) return "—";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format backend integer price (stored as cents or flat) to currency string.
 * If value > 1000 it's assumed to be a flat dollar amount (not cents).
 */
export function formatPrice(amount: number): string {
  if (!amount && amount !== 0) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate a human-readable booking reference from numeric id: 8001 → "BK-8001"
 */
export function formatBookingId(id: number): string {
  return `BK-${id}`;
}

/**
 * Normalize backend status string to display label
 */
export function formatStatus(
  status: string,
): "Confirmed" | "Pending" | "Cancelled" {
  const map: Record<string, "Confirmed" | "Pending" | "Cancelled"> = {
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
  };
  return map[status?.toLowerCase()] ?? "Pending";
}
