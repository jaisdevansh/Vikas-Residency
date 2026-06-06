"use client";

import { useState } from "react";
import { Plus, Trash2, X, Image as ImageIcon, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type GalleryImage = {
  id: number;
  image_url: string;
  caption: string;
};

export default function GalleryAdminClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ image_url: "", caption: "" });
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const startAdd = () => {
    setIsAdding(true);
    setDeletingId(null);
    setFormData({ image_url: "", caption: "" });
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setFormData({ image_url: "", caption: "" });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    setLoading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      
      if (data.success && data.url) {
        const fullUrl = data.url;
        setFormData((prev) => ({ ...prev, image_url: fullUrl }));
        showToast('Image file uploaded successfully!');
      } else {
        showToast('Upload failed: ' + (data.error || 'Unknown error'), 'error');
      }
    } catch (error) {
      showToast('Error uploading image file', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.image_url) {
      showToast("Please upload an image first", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success && data.image) {
        setImages([data.image, ...images]);
        setIsAdding(false);
        setFormData({ image_url: "", caption: "" });
        showToast("Photo added to gallery!");
      } else {
        showToast("Failed to save: " + (data.error || "Unknown error"), "error");
      }
    } catch (error) {
      showToast("Error saving to gallery. Make sure backend is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      
      if (data.success) {
        setImages(images.filter(img => img.id !== id));
        setDeletingId(null);
        showToast("Photo deleted successfully!");
      } else {
        showToast("Failed to delete: " + data.error, "error");
      }
    } catch (error) {
      showToast("Error deleting. Make sure backend is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header action */}
      <div className="flex justify-between items-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Manage the public website photo gallery. Upload new pictures or delete existing ones.
        </p>
        <button
          onClick={startAdd}
          disabled={isAdding}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 shadow-sm font-semibold shrink-0"
        >
          <Plus size={18} />
          <span>Upload Photo</span>
        </button>
      </div>

      {/* Upload card/modal block */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="text-accent w-5 h-5" /> Upload New Gallery Photo
              </h3>
              <button onClick={cancelAdd} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* File input and details */}
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Choose Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={loading}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400"
                  />
                  <p className="text-xs text-gray-400 mt-1">Supported formats: JPG, JPEG, PNG, WEBP. Max size: 5MB.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Caption (Optional)</label>
                  <input
                    type="text"
                    value={formData.caption}
                    onChange={(e) => setFormData((prev) => ({ ...prev, caption: e.target.value }))}
                    className="w-full p-2 border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-black/20 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="Enter a short title or caption"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={loading || !formData.image_url}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {loading ? "Saving..." : "Save Image"}
                  </button>
                  <button
                    onClick={cancelAdd}
                    className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Preview block */}
              <div className="flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl h-[200px] relative overflow-hidden bg-gray-50 dark:bg-black/10">
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    alt="Upload preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400 space-y-2">
                    <ImageIcon className="mx-auto w-12 h-12" />
                    <p className="text-sm">Image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden group relative flex flex-col h-[280px]"
          >
            {/* Image display */}
            <div className="relative flex-1 overflow-hidden">
              <img
                src={img.image_url}
                alt={img.caption || "Gallery item"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              
              {/* Delete button layer overlay */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {deletingId !== img.id && (
                  <button
                    onClick={() => setDeletingId(img.id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* Confirmation block overlay */}
              {deletingId === img.id && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 p-4 text-center z-10">
                  <p className="text-white text-sm font-semibold">Are you sure you want to delete this photo?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(img.id)}
                      disabled={loading}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded shadow-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      disabled={loading}
                      className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold rounded shadow-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Caption display */}
            <div className="p-4 bg-white dark:bg-card border-t border-gray-50 dark:border-white/5 flex items-center justify-between shrink-0">
              <span className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {img.caption || "No caption added"}
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                ID: {img.id}
              </span>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && !isAdding && (
        <div className="text-center py-16 bg-gray-50 dark:bg-black/10 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10">
          <ImageIcon className="mx-auto w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">No gallery images uploaded yet</p>
          <p className="text-sm text-gray-400 mt-1">Click the Upload Photo button to start populating your gallery.</p>
        </div>
      )}

      {/* Toast notifier */}
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
