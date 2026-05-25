export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  role: 'ADMIN';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}