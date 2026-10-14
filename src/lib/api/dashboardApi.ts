import type {
  Booking,
  Favorite,
  Property,
} from "../../redux/features/dashboard/dashboardTypes";

const BASE_URL = "http://127.0.0.1:8000";

function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  // IMPORTANT:
  // Replace these keys with the exact storage key used by your auth feature.
  const possibleKeys = ["access_token", "token", "authToken", "estate_token"];

  for (const key of possibleKeys) {
    const token = localStorage.getItem(key);

    if (token) {
      return token;
    }
  }

  return null;
}

async function request<T>(endpoint: string, requiresAuth = false): Promise<T> {
  const token = requiresAuth ? getAuthToken() : null;

  if (requiresAuth && !token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    const message =
      typeof body?.detail === "string"
        ? body.detail
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

function extractList<T>(response: unknown): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (response && typeof response === "object") {
    const result = response as Record<string, unknown>;

    if (Array.isArray(result.data)) {
      return result.data as T[];
    }

    if (Array.isArray(result.items)) {
      return result.items as T[];
    }
  }

  return [];
}

export const dashboardApi = {
  async getProperties(): Promise<Property[]> {
    const response = await request<unknown>("/properties/getAllProperty");
    return extractList<Property>(response);
  },

  async getBookings(): Promise<Booking[]> {
    const response = await request<unknown>("/bookings/", true);
    return extractList<Booking>(response);
  },

  async getFavorites(): Promise<Favorite[]> {
    const response = await request<unknown>("/favorites/", true);
    return extractList<Favorite>(response);
  },
};
