"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/src/redux/store";
import type { User, UserRole } from "@/src/types/userTypes";
import {
  fetchUsers,
  deleteUserThunk,
} from "@/src/redux/features/user/userThunk";
import UserFilters, { type RoleFilter } from "./UserFilters";
import UserTable from "./UserTable";

export default function UserManagement() {
  const dispatch = useDispatch<AppDispatch>();

  const { users, loading, deleting, error } = useSelector(
    (state: RootState) => state.user,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return users.filter((user: User) => {
      const matchesSearch =
        user.full_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        String(user.id).includes(query);

      const matchesRole =
        roleFilter === "ALL" || user.role === (roleFilter as UserRole);

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const handleDelete = async (user: User) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete ${user.full_name}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    const result = await dispatch(deleteUserThunk(user.id));

    if (deleteUserThunk.rejected.match(result)) {
      window.alert(
        typeof result.payload === "string"
          ? result.payload
          : "Failed to delete user.",
      );
    }
  };

  const summaryCards = [
    {
      label: "Total Registered Users",
      value: users.length,
      badge: "All",
      color: "bg-gray-100 text-gray-600",
    },
    {
      label: "Admins",
      value: users.filter((user) => user.role === "ADMIN").length,
      badge: "Admin",
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Agents",
      value: users.filter((user) => user.role === "AGENT").length,
      badge: "Agent",
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      label: "Buyers",
      value: users.filter((user) => user.role === "BUYER").length,
      badge: "Buyer",
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="mx-auto w-full animate-in space-y-6 fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            User Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage registered users, roles, and account verification.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m12-13a4 4 0 11-8 0 4 4 0 018 0zm2 4a4 4 0 014 4v3"
            />
          </svg>

          <span className="text-xs font-medium text-gray-700 sm:text-sm">
            {users.length} registered users
          </span>
        </div> */}
      </div>

      {/* Error State */}
      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4"
        >
          <div>
            <p className="text-sm font-semibold text-rose-800">
              Unable to load users
            </p>

            <p className="mt-1 text-sm text-rose-700">{error}</p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(fetchUsers())}
            className="shrink-0 rounded-md border border-rose-200 bg-white px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100"
          >
            Retry
          </button>
        </div>
      )}

      {/* User Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {summaryCards.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-gray-500 sm:text-sm">
                {item.label}
              </p>

              {/* Smaller Badge */}
              <span
                className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium sm:text-xs ${item.color}`}
              >
                {item.badge}
              </span>
            </div>

            <p className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
        <UserFilters
          searchQuery={searchQuery}
          roleFilter={roleFilter}
          onSearchChange={setSearchQuery}
          onRoleChange={setRoleFilter}
        />
      </div>

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        loading={loading}
        deleting={deleting}
        onDelete={handleDelete}
      />
    </div>
  );
}
