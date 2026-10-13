"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AuthLayout({
  children,
  title,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Left Side - Form */}
      <div className="flex flex-1 items-center justify-center bg-white p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black">
              <span className="text-2xl font-bold text-white">E</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              EstateAdmin
            </h1>
          </div>

          {/* Page Title */}
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-black">
            {title}
          </h2>

          <p className="mb-8 text-sm text-gray-500">
            Admin Portal
          </p>

          {/* Authentication Form */}
          {children}
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="relative hidden flex-1 overflow-hidden border-l border-gray-200 bg-black lg:flex">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-800" />

        {/* Subtle Decorative Circles */}
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />

        <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full border border-white/10" />

        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-white/10" />

        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-center p-10 xl:p-16">
          <div className="relative z-10 max-w-lg text-white">
            {/* Brand Label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-white" />

              <span className="text-xs font-medium tracking-wide text-gray-200">
                ESTATEADMIN PLATFORM
              </span>
            </div>

            {/* Heading */}
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Manage Properties
              <br />
              with Confidence.
            </h2>

            <p className="max-w-md text-base leading-7 text-gray-300 xl:text-lg">
              A professional real estate management platform designed
              to help administrators manage properties, users, bookings,
              and business operations in one place.
            </p>

            {/* Feature Highlights */}
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 10 9-7 9 7" />
                    <path d="M5 9v12h14V9" />
                    <path d="M9 21v-7h6v7" />
                  </svg>
                </div>

                <span className="text-sm font-medium text-gray-200">
                  Centralized Property Management
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="10" cy="7" r="4" />
                    <path d="M20 8v6" />
                    <path d="M23 11h-6" />
                  </svg>
                </div>

                <span className="text-sm font-medium text-gray-200">
                  User and Booking Administration
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-5 5" />
                  </svg>
                </div>

                <span className="text-sm font-medium text-gray-200">
                  Business Analytics and Insights
                </span>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="mt-12 border-l-2 border-white/40 pl-5">
              <p className="text-sm italic leading-6 text-gray-300">
                "Everything you need to manage your real estate
                operations, all in one place."
              </p>

              <p className="mt-3 text-xs font-medium text-gray-500">
                ESTATEADMIN · PROPERTY MANAGEMENT
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Statistics */}
        <div className="absolute bottom-8 right-8 z-10 rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-md xl:bottom-10 xl:right-10">
          <div className="flex gap-8 text-white">
            <div>
              <div className="text-2xl font-bold">248</div>
              <div className="mt-1 text-xs text-gray-400">
                Properties
              </div>
            </div>

            <div className="w-px bg-white/15" />

            <div>
              <div className="text-2xl font-bold">87</div>
              <div className="mt-1 text-xs text-gray-400">
                Active Deals
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}