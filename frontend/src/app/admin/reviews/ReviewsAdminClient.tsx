"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Star, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

export default function ReviewsAdminClient({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [toast, setToast] = useState<{message: string, type: "success" | "error"} | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    rating: "5",
    text: "",
    date: ""
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setFormData({ name: "", rating: "5", text: "", date: "" });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (review: Review) => {
    setFormData({
      name: review.name,
      rating: String(review.rating),
      text: review.text,
      date: review.date
    });
    setEditingId(review.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/reviews/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== id));
        showToast("Review deleted successfully!");
      } else {
        showToast("Failed to delete review.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Error deleting review.", "error");
    } finally {
      setDeletingReviewId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
        ? `http://127.0.0.1:5000/api/reviews/${editingId}`
        : 'http://127.0.0.1:5000/api/reviews';
        
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating)
        })
      });

      const data = await res.json();
      if (data.success) {
        if (editingId) {
          setReviews(reviews.map(r => r.id === editingId ? data.data : r));
          showToast("Review updated successfully!");
        } else {
          setReviews([data.data, ...reviews]);
          showToast("Review added successfully!");
        }
        resetForm();
      } else {
        showToast(data.error || "Failed to save review.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Error saving review.", "error");
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1815] rounded-xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
        <h3 className="font-semibold text-lg dark:text-white">All Reviews</h3>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus size={16} /> Add Review
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-black/20 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4 rounded-tl-lg">Guest Name</th>
              <th scope="col" className="px-6 py-4">Rating</th>
              <th scope="col" className="px-6 py-4">Review Text</th>
              <th scope="col" className="px-6 py-4">Date</th>
              <th scope="col" className="px-6 py-4 text-right rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="bg-white dark:bg-[#1a1815] border-b dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {review.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-gray-300"} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-md truncate" title={review.text}>
                  "{review.text}"
                </td>
                <td className="px-6 py-4">
                  {review.date}
                </td>
                <td className="px-6 py-4 text-right">
                  {deletingReviewId === review.id ? (
                    <div className="flex items-center justify-end gap-2 animate-in fade-in zoom-in duration-200">
                      <span className="text-sm text-red-500 mr-1 font-medium">Delete?</span>
                      <button 
                        onClick={() => handleDelete(review.id)}
                        className="px-2.5 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors shadow-sm font-medium"
                      >
                        Yes
                      </button>
                      <button 
                        onClick={() => setDeletingReviewId(null)}
                        className="px-2.5 py-1 bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-300 text-xs rounded hover:bg-gray-300 dark:hover:bg-white/20 transition-colors font-medium"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(review)} 
                        disabled={deletingReviewId !== null}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors disabled:opacity-30"
                        title="Edit Review"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => setDeletingReviewId(review.id)}
                        disabled={deletingReviewId !== null}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors disabled:opacity-30"
                        title="Delete Review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No reviews found. Click "Add Review" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1a1815] rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b dark:border-white/10">
              <h3 className="text-xl font-bold dark:text-white">
                {editingId ? "Edit Review" : "Add Review"}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Guest Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-2 border rounded bg-gray-50 dark:bg-black/50 dark:border-white/10 dark:text-white"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Rating (1-5)</label>
                  <input 
                    type="number" 
                    min="1" max="5" required
                    className="w-full p-2 border rounded bg-gray-50 dark:bg-black/50 dark:border-white/10 dark:text-white"
                    value={formData.rating}
                    onChange={e => setFormData({...formData, rating: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Date (e.g. "2 days ago")</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded bg-gray-50 dark:bg-black/50 dark:border-white/10 dark:text-white"
                    value={formData.date}
                    placeholder="2 days ago"
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Review Text</label>
                <textarea 
                  required rows={4}
                  className="w-full p-2 border rounded bg-gray-50 dark:bg-black/50 dark:border-white/10 dark:text-white resize-none"
                  value={formData.text}
                  onChange={e => setFormData({...formData, text: e.target.value})}
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit">{editingId ? "Save Changes" : "Add Review"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white font-medium z-50 ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75 transition-opacity">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
