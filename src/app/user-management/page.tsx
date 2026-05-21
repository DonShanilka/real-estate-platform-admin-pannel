"use client";

import React, { useState } from "react";
import { Icons } from "@/components/Icons";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Agent" | "Buyer" | "Seller";
  registered: string;
  status: "Active" | "Suspended" | "Pending";
  propertiesCount: number;
}

const initialUsers: User[] = [
  { id: "U-4001", name: "Sarah Jenkins", email: "sarah.jenkins@estate.com", role: "Agent", registered: "Jan 14, 2025", status: "Active", propertiesCount: 18 },
  { id: "U-4002", name: "Michael Chen", email: "michael.chen@gmail.com", role: "Buyer", registered: "Feb 22, 2025", status: "Active", propertiesCount: 0 },
  { id: "U-4003", name: "David Miller", email: "miller.david@sellprop.net", role: "Seller", registered: "Mar 05, 2025", status: "Active", propertiesCount: 3 },
  { id: "U-4004", name: "Alex Rivera", email: "alex.rivera@estate.com", role: "Agent", registered: "Nov 12, 2024", status: "Active", propertiesCount: 22 },
  { id: "U-4005", name: "Jessica Taylor", email: "jess.taylor@outlook.com", role: "Buyer", registered: "Apr 18, 2025", status: "Suspended", propertiesCount: 0 },
  { id: "U-4006", name: "Robert Downey", email: "robert.downey@marvel.com", role: "Seller", registered: "May 02, 2026", status: "Pending", propertiesCount: 1 },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "Agent" | "Buyer" | "Seller">("All");

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === "Active" ? "Suspended" : "Active";
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "All" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Filters & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex gap-2">
          {(["All", "Agent", "Buyer", "Seller"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                roleFilter === role
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {role === "All" ? "All Users" : `${role}s`}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ID or email..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-zinc-200 text-zinc-800 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
          />
        </div>
      </div>

      {/* Users Database Table */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">User</th>
                <th className="p-4">System Role</th>
                <th className="p-4">Reg Date</th>
                <th className="p-4">Listings</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50 font-medium">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-all">
                    {/* User profile detail block */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-rose-600 flex items-center justify-center font-bold text-white shadow-sm shrink-0">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 block truncate">{user.name}</span>
                        <span className="text-[10px] text-zinc-400 font-mono block">{user.id} • {user.email}</span>
                      </div>
                    </td>

                    {/* Role badge */}
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          user.role === "Agent"
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                            : user.role === "Seller"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4 text-zinc-400">{user.registered}</td>

                    <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{user.propertiesCount}</td>

                    {/* Status badge */}
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : user.status === "Pending"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                            : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="p-4 text-right">
                      {user.status !== "Pending" ? (
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all border ${
                            user.status === "Active"
                              ? "text-rose-600 border-rose-200 hover:bg-rose-50 dark:border-rose-950/40 dark:hover:bg-rose-950/20"
                              : "text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-950/40 dark:hover:bg-emerald-950/20"
                          }`}
                        >
                          {user.status === "Active" ? "Suspend Account" : "Activate Account"}
                        </button>
                      ) : (
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              setUsers(users.map((u) => (u.id === user.id ? { ...u, status: "Active" } : u)));
                            }}
                            className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:opacity-90"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setUsers(users.filter((u) => u.id !== user.id));
                            }}
                            className="px-2 py-1 bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-[10px] font-bold rounded-lg hover:opacity-90"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-zinc-400 font-semibold">
                    No users found matching your search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
