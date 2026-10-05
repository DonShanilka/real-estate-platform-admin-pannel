import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
instance.interceptors.request.use((config) => {
  // Read the token saved by the login flow.
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : "";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;