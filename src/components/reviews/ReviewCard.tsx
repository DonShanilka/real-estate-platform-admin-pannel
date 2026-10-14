"use client";

import { Icons } from "@/src/components/layout/Icons";

export interface ReviewDisplayItem {
  id: string;
  reviewer: string;
  reviewerRole: string;
  property: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewCardProps {
  review: ReviewDisplayItem;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.reviewer
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300">
      {/* Reviewer Details and Rating */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full 
          bg-gray-100 text-xs font-semibold text-gray-700"
          >
            {initials || "U"}
          </div>

          {/* Name and Details */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {review.reviewer}
              </h3>

              <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                {review.reviewerRole}
              </span>
            </div>

            <p className="mt-0.5 text-xs text-gray-500">{review.date}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, index) => {
              const StarIcon =
                index < Math.round(review.rating)
                  ? Icons.StarFilled
                  : Icons.Star;

              return <StarIcon key={index} size={13} />;
            })}
          </div>

          <span className="text-xs font-semibold text-gray-700">
            {review.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Property */}
      <div className="mt-3">
        <p className="truncate text-xs font-medium text-gray-700">
          <span className="text-gray-400">Property: </span>
          {review.property}
        </p>
      </div>

      {/* Review Comment */}
      <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2.5">
        <p className="break-words text-sm leading-5 text-gray-600">
          {review.comment}
        </p>
      </div>
    </article>
  );
}
