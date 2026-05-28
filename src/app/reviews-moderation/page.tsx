"use client";

import React, { useEffect, useState } from "react";
import { Icons } from "@/src/components/layout/Icons";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { fetchReviewsThunk } from "@/src/redux/features/reviews/reviewsThunk";
import { setActiveTab, updateLocalReviewStatus } from "@/src/redux/features/reviews/reviewsSlice";

interface Review {
  id: string;
  dbId: number;
  reviewer: string;
  reviewerRole: "Guest" | "Buyer";
  property: string;
  rating: number;
  comment: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function ReviewsModeration() {
  const dispatch = useAppDispatch();
  const { items: rawReviews, loading, error, activeTab } = useAppSelector((state) => state.reviews);
  
  // Track status updates reactively in local state mapped to database IDs
  const [statuses, setStatuses] = useState<Record<number, "Pending" | "Approved" | "Rejected">>({});

  useEffect(() => {
    dispatch(fetchReviewsThunk());
  }, [dispatch]);

  // Load persisted statuses from localStorage when rawReviews finishes fetching
  useEffect(() => {
    const initialStatuses: Record<number, "Pending" | "Approved" | "Rejected"> = {};
    rawReviews.forEach((item) => {
      const stored = localStorage.getItem(`review_status_${item.id}`);
      initialStatuses[item.id] = (stored === "Approved" || stored === "Rejected") ? stored : "Pending";
    });
    setStatuses(initialStatuses);
  }, [rawReviews]);

  const updateReviewStatus = (id: string, newStatus: "Approved" | "Rejected") => {
    // Extract DB numeric ID from "REV-X" string
    const dbId = parseInt(id.replace("REV-", ""), 10);
    if (!isNaN(dbId)) {
      localStorage.setItem(`review_status_${dbId}`, newStatus);
      setStatuses((prev) => ({ ...prev, [dbId]: newStatus }));
      dispatch(updateLocalReviewStatus({ id: dbId, status: newStatus }));
    }
  };

  // Map backend model structures dynamically to match UI keys perfectly
  const reviews: Review[] = rawReviews.map((item) => ({
    id: `REV-${item.id}`,
    dbId: item.id,
    reviewer: item.user?.full_name || item.user?.name || "Anonymous",
    reviewerRole: (item.user?.role || "Guest") as "Guest" | "Buyer",
    property: item.property?.title || `Property #${item.property_id}`,
    rating: item.rating,
    comment: item.comment || "No comment provided",
    date: item.create_at ? new Date(item.create_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) : "Recent",
    status: statuses[item.id] || "Pending",
  }));

  const filteredReviews = reviews.filter((r) => activeTab === "All" || r.status === activeTab);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Moderation Status Tabs Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            ))}
          </div>
          <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

        {/* Reviews Feed Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-20 bg-zinc-100 dark:bg-zinc-850 rounded" />
                </div>
              </div>
              <div className="mt-4 h-12 w-full bg-zinc-100 dark:bg-zinc-850 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-8 text-center font-semibold dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
        ⚠️ Failed to load reviews: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Moderation Status Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex gap-2">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => dispatch(setActiveTab(tab))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {tab === "All" ? "All Reviews" : `${tab} Reviews`}
            </button>
          ))}
        </div>
        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
          Moderation Console
        </span>
      </div>

      {/* Reviews feed/list */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Reviewer Details */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-white shadow-md shadow-amber-500/10 shrink-0">
                    {rev.reviewer.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-950 dark:text-zinc-50 text-sm">{rev.reviewer}</span>
                      <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 rounded text-[9px] font-bold">
                        {rev.reviewerRole}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">{rev.id} • {rev.date}</span>
                  </div>
                </div>

                {/* Rating Stars Representation */}
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const StarIcon = i < Math.round(rev.rating) ? Icons.StarFilled : Icons.Star;
                      return <StarIcon key={i} size={14} />;
                    })}
                  </div>
                  <span className="text-xs font-bold text-zinc-500">({rev.rating.toFixed(1)})</span>
                </div>
              </div>

              {/* Review Comment Content */}
              <div className="mt-4 space-y-2">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block">
                  Property: {rev.property}
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium bg-zinc-50/50 dark:bg-zinc-800/20 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800/30">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Action Moderation Buttons */}
              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-400 font-semibold">Moderation Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide ${
                      rev.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                        : rev.status === "Pending"
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                        : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>

                {rev.status === "Pending" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateReviewStatus(rev.id, "Approved")}
                      className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:opacity-90 shadow-sm transition-all"
                    >
                      Approve Review
                    </button>
                    <button
                      onClick={() => updateReviewStatus(rev.id, "Rejected")}
                      className="px-3 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-lg hover:opacity-90 shadow-sm transition-all"
                    >
                      Reject Review
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {rev.status !== "Approved" && (
                      <button
                        onClick={() => updateReviewStatus(rev.id, "Approved")}
                        className="px-3 py-1 text-emerald-600 border border-emerald-200 hover:bg-emerald-50 dark:border-emerald-950/40 dark:hover:bg-emerald-950/20 text-[10px] font-bold rounded-lg transition-all"
                      >
                        Change to Approved
                      </button>
                    )}
                    {rev.status !== "Rejected" && (
                      <button
                        onClick={() => updateReviewStatus(rev.id, "Rejected")}
                        className="px-3 py-1 text-rose-600 border border-rose-200 hover:bg-rose-50 dark:border-rose-950/40 dark:hover:bg-rose-950/20 text-[10px] font-bold rounded-lg transition-all"
                      >
                        Change to Rejected
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-400 font-semibold dark:bg-zinc-900 dark:border-zinc-800">
          No reviews available under this category.
        </div>
      )}
    </div>
  );
}
