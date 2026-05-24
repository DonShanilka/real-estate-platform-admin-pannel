import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
instance.interceptors.request.use((config) => {
  // Read token from localStorage (set it once on login or hardcode for dev)
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") ??
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJyb2xlIjoiQURNSU4iLCJleHAiOjE3Nzk2NzY3OTR9.xO0BNBCWxuKjMBkyvc7GykGpRmKAg_FJ1Ng5qtKjwoQ"
      : "";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;