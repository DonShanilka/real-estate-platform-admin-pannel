export type UserRole = "ADMIN" | "AGENT" | "OWNER" | "BUYER";

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  profile_image: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface UpdateUserPayload {
  full_name?: string;
  phone?: string | null;
  profile_image?: string | null;
}