import ReviewsAdminClient from "./ReviewsAdminClient";

import { getReviews } from "@/backend/services/review.service";

export default async function AdminReviewsPage() {
  let reviews = [];
  try {
    reviews = await getReviews();
  } catch (error) {
    console.error("Failed to fetch reviews from DB:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Review Management</h2>
          <p className="text-gray-500 dark:text-white/60">Add, edit, or remove guest experiences.</p>
        </div>
      </div>

      <ReviewsAdminClient initialReviews={reviews} />
    </div>
  );
}
