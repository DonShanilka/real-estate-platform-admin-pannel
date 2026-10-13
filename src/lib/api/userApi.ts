import type { User } from "@/src/types/userTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const userApi = {
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users/`);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  },

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${BASE_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  },

  async deleteUser(id: number): Promise<number> {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);

      throw new Error(error?.detail || "Failed to delete user");
    }

    return id;
  },
};
