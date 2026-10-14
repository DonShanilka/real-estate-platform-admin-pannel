"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { fetchReviewsThunk } from "@/src/redux/features/reviews/reviewsThunk";

import ReviewCard, { type ReviewDisplayItem } from "./ReviewCard";

export default function ReviewsModeration() {
  const dispatch = useAppDispatch();

  const {
    items: rawReviews,
    loading,
    error,
  } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviewsThunk());
  }, [dispatch]);

  const reviews: ReviewDisplayItem[] = rawReviews.map((item) => ({
    id: `REV-${item.id}`,
    reviewer: item.user?.full_name || item.user?.name || "Anonymous",
    reviewerRole: item.user?.role || "Guest",
    property: item.property?.title || `Property #${item.property_id}`,
    rating: Number(item.rating) || 0,
    comment: item.comment?.trim() || "No comment provided.",

    date: item.create_at
      ? new Date(item.create_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Recent",
  }));

  return (
    <section className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
      {/* Fixed Header */}
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-1 pb-4">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            View feedback submitted by users about properties.
          </p>
        </div>

        {/* Total Reviews */}
        <span className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
          {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </span>
      </header>

      {/* Scrollable Container */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 pr-2 pt-6">
        {/* Inner Content Wrapper */}
        <div className="min-h-full pb-6">
          {/* Loading State */}
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-gray-100" />

                    <div className="space-y-2">
                      <div className="h-3 w-32 rounded bg-gray-100" />
                      <div className="h-2.5 w-20 rounded bg-gray-100" />
                    </div>
                  </div>

                  <div className="mt-3 h-3 w-2/3 rounded bg-gray-100" />

                  <div className="mt-3 h-12 rounded-lg bg-gray-50" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <p className="text-sm font-semibold text-red-700">
                Failed to load reviews
              </p>

              <p className="mt-1 text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={() => dispatch(fetchReviewsThunk())}
                className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
              >
                Retry
              </button>
            </div>
          )}

          {/* Reviews List */}
          {!loading && !error && reviews.length > 0 && (
            <div className="space-y-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && reviews.length === 0 && (
            <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center">
              <p className="text-sm font-semibold text-gray-800">
                No reviews available
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Customer reviews will appear here when they are submitted.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
