"use client";

import React, { useState } from "react";
import { Icons } from "@/src/components/Icons";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@realestateplatform.com");
  const [platformFee, setPlatformFee] = useState("5");
  const [currency, setCurrency] = useState("USD ($)");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notifBookings, setNotifBookings] = useState(true);
  const [notifReviews, setNotifReviews] = useState(true);
  const [notifChats, setNotifChats] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Alert banner for saved states */}
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
          <svg className="w-5 h-5 text-emerald-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-bold">System Parameters Saved!</p>
            <p className="text-[10px] text-emerald-600/80 mt-0.5">Configuration updates have been broadcasted to all cloud nodes.</p>
          </div>
        </div>
      )}

      {/* Main configuration container */}
      <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <div className="bg-zinc-950 text-white p-6 border-b border-zinc-800">
          <h2 className="text-base font-bold">Console System Settings</h2>
          <p className="text-[10px] text-zinc-400 mt-0.5">Configure platform margins, admin notifications, and account credentials</p>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-8">
          {/* Section 1: Profile credentials */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500">1. Admin Accounts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Administrator Name</label>
                <input
                  type="text"
                  required
                  defaultValue="John Doe"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Alert Notification Email</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800/80"></div>

          {/* Section 2: Financial Margin Parameters */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500">2. Financial margins & variables</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Platform Commission Fee (%)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="20"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Default Catalog Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
                >
                  <option value="USD ($)">USD ($) - United States Dollar</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800/80"></div>

          {/* Section 3: Notification Alerts */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500">3. Operation Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={notifBookings}
                  onChange={(e) => setNotifBookings(e.target.checked)}
                  className="accent-rose-500 rounded cursor-pointer shrink-0"
                />
                <span>Email me alerts immediately upon new booking reservations</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={notifReviews}
                  onChange={(e) => setNotifReviews(e.target.checked)}
                  className="accent-rose-500 rounded cursor-pointer shrink-0"
                />
                <span>Alert me for review moderation requests</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={notifChats}
                  onChange={(e) => setNotifChats(e.target.checked)}
                  className="accent-rose-500 rounded cursor-pointer shrink-0"
                />
                <span>Send support chat escalation summaries daily</span>
              </label>
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800/80"></div>

          {/* Section 4: Maintenance switches */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500">4. System Status</h3>
            <div className="flex items-center justify-between p-4 bg-rose-50/20 border border-rose-100 rounded-xl dark:bg-rose-950/10 dark:border-rose-950/50">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block">Console Maintenance Mode</span>
                <p className="text-[10px] text-zinc-400">Lock database inputs and display &ldquo;Site Under Maintenance&rdquo; message to end users.</p>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${
                  maintenanceMode ? "bg-rose-500" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all ${
                    maintenanceMode ? "left-6.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-bold rounded-xl hover:opacity-90 shadow-md shadow-rose-500/10 transition-all"
            >
              Save Configuration Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
