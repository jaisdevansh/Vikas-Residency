import ReviewsAdminClient from "./ReviewsAdminClient";

export const runtime = "edge";

export default async function AdminReviewsPage() {
  let reviews = [];
  try {
    const res = await fetch('http://127.0.0.1:5000/api/reviews', { cache: 'no-store' });
    const data = await res.json();
    if (data.success) {
      reviews = data.data;
    }
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
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
