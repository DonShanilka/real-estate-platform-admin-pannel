"use client";

import React, { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const [adminName, setAdminName] = useState("John Doe");
  const [adminEmail, setAdminEmail] = useState("admin@realestateplatform.com");

  const [platformFee, setPlatformFee] = useState("5");
  const [currency, setCurrency] = useState("USD ($)");

  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [notifBookings, setNotifBookings] = useState(true);
  const [notifReviews, setNotifReviews] = useState(true);
  const [notifChats, setNotifChats] = useState(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const inputClassName =
    "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-50";

  const labelClassName = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            System Settings
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your platform configuration, notifications, and system
            preferences.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-xs font-medium text-gray-600">
            System Operational
          </span>
        </div>
      </div>

      {/* Success Notification */}
      {saved && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-5 w-5 text-emerald-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald-800">
              Settings saved successfully
            </p>

            <p className="mt-1 text-xs text-emerald-700">
              Your settings have been updated in the current interface.
            </p>
          </div>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Admin Account Settings */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-5 sm:px-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
              <svg
                className="h-5 w-5 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m12-13a4 4 0 11-8 0 4 4 0 018 0zm2 4a4 4 0 014 4v3m-1-11a4 4 0 010 8"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Administrator Account
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Configure administrator profile information and notification
                email.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <label htmlFor="adminName" className={labelClassName}>
                Administrator Name
              </label>

              <input
                id="adminName"
                type="text"
                required
                autoComplete="name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter administrator name"
                className={inputClassName}
              />

              <p className="mt-1.5 text-xs text-gray-400">
                Name displayed in the admin profile.
              </p>
            </div>

            <div>
              <label htmlFor="adminEmail" className={labelClassName}>
                Notification Email
              </label>

              <input
                id="adminEmail"
                type="email"
                required
                autoComplete="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@example.com"
                className={inputClassName}
              />

              <p className="mt-1.5 text-xs text-gray-400">
                Email address for platform notifications.
              </p>
            </div>
          </div>
        </section>

        {/* Financial Settings */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-5 sm:px-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
              <svg
                className="h-5 w-5 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M12 8c-2.21 0-4 1.12-4 2.5S9.79 13 12 13s4 1.12 4 2.5S14.21 18 12 18m0-10V6m0 14v-2m9-6a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Financial Configuration
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Set the platform commission rate and default property listing
                currency.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <label htmlFor="platformFee" className={labelClassName}>
                Platform Commission Fee
              </label>

              <div className="relative">
                <input
                  id="platformFee"
                  type="number"
                  required
                  min="1"
                  max="20"
                  step="0.1"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(e.target.value)}
                  className={`${inputClassName} pr-10`}
                />

                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-medium text-gray-400">
                  %
                </span>
              </div>

              <p className="mt-1.5 text-xs text-gray-400">
                Allowed commission range: 1%–20%.
              </p>
            </div>

            <div>
              <label htmlFor="currency" className={labelClassName}>
                Default Currency
              </label>

              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`${inputClassName} cursor-pointer`}
              >
                <option value="USD ($)">USD ($) - US Dollar</option>

                <option value="EUR (€)">EUR (€) - Euro</option>

                <option value="GBP (£)">GBP (£) - British Pound</option>

                <option value="LKR (Rs)">LKR (Rs) - Sri Lankan Rupee</option>
              </select>

              <p className="mt-1.5 text-xs text-gray-400">
                Default currency displayed across the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-5 sm:px-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
              <svg
                className="h-5 w-5 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.66V5a2 2 0 10-4 0v.34A6 6 0 006 11v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Notification Preferences
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Choose which platform activities should trigger notifications.
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100 px-5 sm:px-6">
            {/* Booking Notifications */}
            <label className="flex cursor-pointer items-center justify-between gap-4 py-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.7}
                      d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Booking Notifications
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Receive alerts when new property viewing bookings are
                    created.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={notifBookings}
                onChange={(e) => setNotifBookings(e.target.checked)}
                className="h-4 w-4 shrink-0 cursor-pointer accent-rose-600"
              />
            </label>

            {/* Review Notifications */}
            <label className="flex cursor-pointer items-center justify-between gap-4 py-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                  <svg
                    className="h-4 w-4 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.7}
                      d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Review Moderation
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Get notified when property reviews require moderation.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={notifReviews}
                onChange={(e) => setNotifReviews(e.target.checked)}
                className="h-4 w-4 shrink-0 cursor-pointer accent-rose-600"
              />
            </label>

            {/* Chat Notifications */}
            <label className="flex cursor-pointer items-center justify-between gap-4 py-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                  <svg
                    className="h-4 w-4 text-violet-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.7}
                      d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8v.5z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Support Chat Summaries
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Receive daily summaries of escalated support conversations.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={notifChats}
                onChange={(e) => setNotifChats(e.target.checked)}
                className="h-4 w-4 shrink-0 cursor-pointer accent-rose-600"
              />
            </label>
          </div>
        </section>

        {/* System Status */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-5 sm:px-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
              <svg
                className="h-5 w-5 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M12 9v4m0 4h.01M10.3 3.8L1.9 18.3A2 2 0 003.6 21h16.8a2 2 0 001.7-2.7L13.7 3.8a2 2 0 00-3.4 0z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                System Status
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Manage maintenance mode and platform availability.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div
              className={`flex items-center justify-between gap-4 rounded-xl border p-4 transition-colors ${
                maintenanceMode
                  ? "border-amber-200 bg-amber-50"
                  : "border-gray-200 bg-gray-50/70"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    maintenanceMode ? "bg-amber-100" : "bg-white"
                  }`}
                >
                  <svg
                    className={`h-5 w-5 ${
                      maintenanceMode ? "text-amber-600" : "text-gray-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.7}
                      d="M12 8v4m0 4h.01M10.3 3.8L1.9 18.3A2 2 0 003.6 21h16.8a2 2 0 001.7-2.7L13.7 3.8a2 2 0 00-3.4-14.5z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Maintenance Mode
                  </p>

                  <p className="mt-1 max-w-lg text-xs leading-5 text-gray-500">
                    {maintenanceMode
                      ? "Maintenance mode is enabled. The website should display a maintenance notice to users."
                      : "Enable this option when performing planned platform maintenance."}
                  </p>

                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 text-xs font-medium ${
                      maintenanceMode ? "text-amber-700" : "text-emerald-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        maintenanceMode ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />

                    {maintenanceMode
                      ? "Maintenance enabled"
                      : "Platform operational"}
                  </span>
                </div>
              </div>

              {/* Accessible Toggle */}
              <button
                type="button"
                role="switch"
                aria-checked={maintenanceMode}
                aria-label="Toggle maintenance mode"
                onClick={() => setMaintenanceMode((current) => !current)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-rose-100 ${
                  maintenanceMode ? "bg-rose-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    maintenanceMode ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <p className="mt-3 text-xs leading-5 text-gray-400">
              Note: This switch updates the current UI state. Enforcing
              maintenance mode across the website requires backend integration.
            </p>
          </div>
        </section>

        {/* Save Settings */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-gray-400">
            Review your changes before saving your configuration.
          </p>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-rose-600/10 transition-all hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100 active:scale-[0.98]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
