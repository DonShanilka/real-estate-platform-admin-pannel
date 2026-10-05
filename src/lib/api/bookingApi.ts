import { Booking, BookingStatus } from "@/src/types/booking";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const bookingApi = {
  async getAll(params?: { status?: string; search?: string }): Promise<Booking[]> {
    const query = new URLSearchParams();
    if (params?.status && params.status !== "all") {
      query.set("status", params.status);
    }
    if (params?.search) {
      query.set("search", params.search);
    }

    const url = `${BASE_URL}/bookings${query.toString() ? `?${query}` : ""}`;
    const res = await fetch(url, { headers: getAuthHeaders() });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to fetch bookings");
    }

    return res.json();
  },


  async getById(id: number): Promise<Booking> {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Booking not found");
    }

    return res.json();
  },


  async updateStatus(id: number, status: BookingStatus): Promise<Booking> {
    const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to update booking status");
    }

    return res.json();
  },
};