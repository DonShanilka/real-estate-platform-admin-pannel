"use client";

import React, { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import {
  loginSuccess,
  setLoading,
  authFailure,
} from "@/src/redux/features/auth/authSlice";
import { authApi } from "@/src/lib/api/authApi";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redirect authenticated users to the dashboard.
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  // Handle Login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    dispatch(setLoading(true));

    try {
      const res = await authApi.login(formData);

      localStorage.setItem("access_token", res.access_token);

      dispatch(loginSuccess(res.access_token));

      router.replace("/dashboard");
    } catch (err: unknown) {
      let message = "Invalid email address or password.";

      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (
          err as {
            response?: {
              data?: {
                detail?: string;
              };
            };
          }
        ).response;

        if (response?.data?.detail) {
          message = response.data.detail;
        }
      }

      setError(message);
      dispatch(authFailure(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Address */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          placeholder="admin@realestate.com"
          className="
            w-full rounded-xl border border-gray-200 bg-white
            px-4 py-3.5 text-sm text-black
            placeholder:text-gray-400
            transition-all duration-200
            focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10
          "
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            placeholder="Enter your password"
            className="
              w-full rounded-xl border border-gray-200 bg-white
              px-4 py-3.5 pr-12 text-sm text-black
              placeholder:text-gray-400
              transition-all duration-200
              focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10
            "
          />

          {/* Toggle Password Visibility */}
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              rounded-lg p-2 text-gray-400
              transition-colors hover:bg-gray-100 hover:text-black
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
            "
          >
            {showPassword ? (
              // Eye-off icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5 0 8.3 4.5 9 7-.3 1.1-1.1 2.4-2.3 3.5" />
                <path d="M6.2 6.2C4 7.6 2.5 10 2 12c.7 2.5 4 7 10 7 1 0 2-.2 2.9-.5" />
              </svg>
            ) : (
              // Eye icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="
            rounded-xl border border-gray-200 bg-gray-50
            px-4 py-3 text-sm text-gray-800
          "
        >
          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>

            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Sign In Button */}
      <button
        type="submit"
        className="
          flex w-full items-center justify-center gap-2
          rounded-xl bg-black px-4 py-3.5
          text-sm font-semibold text-white
          shadow-sm transition-all duration-200
          hover:bg-gray-800 active:scale-[0.99]
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-black focus-visible:ring-offset-2
        "
      >
        <span>Sign In</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <a
          href="/auth/register"
          className="font-semibold text-black underline-offset-4 transition-colors hover:text-gray-600 hover:underline"
        >
          Register here
        </a>
      </p>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>

        <span className="text-xs text-gray-400">
          Secure administrator access
        </span>
      </div>
    </form>
  );
}
