"use client";

import { useState } from "react";
import { Pencil, Save, X, Image as ImageIcon, Trash2, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RoomsAdminClient({ initialRooms }: { initialRooms: any[] }) {
  const [rooms, setRooms] = useState(initialRooms);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [deletingRoomId, setDeletingRoomId] = useState<number | null>(null);
  const [toast, setToast] = useState<{message: string, type: "success" | "error"} | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const startEdit = (room: any) => {
    setEditingRoom(room.id);
    setDeletingRoomId(null);
    setIsAdding(false);
    setFormData({
      name: room.name,
      price: room.price,
      capacity: room.capacity,
      image_url: room.image_url || ""
    });
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingRoom(null);
    setDeletingRoomId(null);
    setFormData({
      name: "",
      price: 1000,
      capacity: 2,
      image_url: ""
    });
  };

  const cancelEdit = () => {
    setEditingRoom(null);
    setDeletingRoomId(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleSave = async (id: number | null) => {
    setLoading(true);
    try {
      if (isAdding) {
        // Create new room
        const res = await fetch(`/api/rooms`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success && data.room) {
          setRooms([...rooms, data.room]);
          setIsAdding(false);
          setFormData({});
          showToast("Room added successfully!");
        } else {
          showToast("Failed to add room: " + (data.error || "Unknown error"), "error");
        }
      } else {
        // Update existing room
        const res = await fetch(`/api/rooms/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          setRooms(rooms.map(r => r.id === id ? { ...r, ...formData } : r));
          setEditingRoom(null);
          showToast("Room updated successfully!");
        } else {
          showToast("Failed to update room: " + data.error, "error");
        }
      }
    } catch (error) {
      showToast("Error saving room. Make sure the backend is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rooms/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setRooms(rooms.filter(r => r.id !== id));
        setDeletingRoomId(null);
        showToast("Room deleted successfully!");
      } else {
        showToast("Failed to delete room: " + data.error, "error");
      }
    } catch (error) {
      showToast("Error deleting room. Make sure the backend is running.", "error");
    } finally {
      setLoading(false);
    }
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
        setFormData((prev: any) => ({ ...prev, image_url: data.url }));
        showToast('Image uploaded successfully!');
      } else {
        showToast('Failed to upload image: ' + (data.error || 'Unknown error'), 'error');
      }
    } catch (error) {
      showToast('Error uploading image', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button 
          onClick={startAdd}
          disabled={isAdding || editingRoom !== null}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Plus size={18} />
          <span>Add New Room</span>
        </button>
      </div>

      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm w-24">Image</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Room Name</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Price (₹)</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Capacity</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isAdding && (
                <tr className="bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/30">
                  <td className="p-4">
                    <div className="w-16 h-12 bg-gray-100 dark:bg-white/10 rounded-md flex items-center justify-center text-gray-400">
                      <ImageIcon size={20} />
                    </div>
                  </td>
                  <td className="p-4">
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full p-2 border border-blue-200 dark:border-blue-800 rounded bg-white dark:bg-black/20 mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Room Name"
                      autoFocus
                    />
                    <div className="flex flex-col gap-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={loading}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400"
                      />
                      {formData.image_url && <span className="text-xs text-green-600 dark:text-green-400">Image selected/uploaded</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <input 
                      type="number" 
                      value={formData.price === undefined ? "" : formData.price} 
                      onChange={e => setFormData({...formData, price: e.target.value === "" ? "" : Number(e.target.value)})}
                      className="w-24 p-2 border border-blue-200 dark:border-blue-800 rounded bg-white dark:bg-black/20 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </td>
                  <td className="p-4">
                    <input 
                      type="number" 
                      value={formData.capacity === undefined ? "" : formData.capacity} 
                      onChange={e => setFormData({...formData, capacity: e.target.value === "" ? "" : Number(e.target.value)})}
                      className="w-20 p-2 border border-blue-200 dark:border-blue-800 rounded bg-white dark:bg-black/20 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </td>
                  <td className="p-4 text-right align-top pt-5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleSave(null)} disabled={loading} className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors shadow-sm" title="Save New Room">
                        <Save size={18} />
                      </button>
                      <button onClick={cancelEdit} className="p-2 bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-white/20 transition-colors" title="Cancel">
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {rooms.length === 0 && !isAdding ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No rooms found.</td>
                </tr>
              ) : rooms.map((room) => (
                <tr key={room.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    {room.image_url ? (
                      <img src={room.image_url} alt={room.name} className="w-16 h-12 object-cover rounded-md" />
                    ) : (
                      <div className="w-16 h-12 bg-gray-100 dark:bg-white/10 rounded-md flex items-center justify-center text-gray-400">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </td>
                  
                  {editingRoom === room.id ? (
                    <>
                      <td className="p-4">
                        <input 
                          type="text" 
                          value={formData.name} 
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full p-2 border border-blue-400 dark:border-blue-600 rounded bg-white dark:bg-black/20 mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Room Name"
                        />
                        <div className="flex flex-col gap-2">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={loading}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400"
                          />
                          {formData.image_url && <span className="text-xs text-green-600 dark:text-green-400">Image selected/uploaded</span>}
                        </div>
                      </td>
                      <td className="p-4">
                        <input 
                          type="number" 
                          value={formData.price === undefined ? "" : formData.price} 
                          onChange={e => setFormData({...formData, price: e.target.value === "" ? "" : Number(e.target.value)})}
                          className="w-24 p-2 border border-blue-400 dark:border-blue-600 rounded bg-white dark:bg-black/20 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </td>
                      <td className="p-4">
                        <input 
                          type="number" 
                          value={formData.capacity === undefined ? "" : formData.capacity} 
                          onChange={e => setFormData({...formData, capacity: e.target.value === "" ? "" : Number(e.target.value)})}
                          className="w-20 p-2 border border-blue-400 dark:border-blue-600 rounded bg-white dark:bg-black/20 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </td>
                      <td className="p-4 text-right align-top pt-5">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleSave(room.id)} disabled={loading} className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors shadow-sm" title="Save">
                            <Save size={18} />
                          </button>
                          <button onClick={cancelEdit} className="p-2 bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-white/20 transition-colors" title="Cancel">
                            <X size={18} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 font-medium text-gray-900 dark:text-white">{room.name}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">₹{room.price}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{room.capacity} Persons</td>
                      <td className="p-4 text-right">
                        {deletingRoomId === room.id ? (
                          <div className="flex items-center justify-end gap-2 animate-in fade-in zoom-in duration-200">
                            <span className="text-sm text-red-500 mr-2 font-medium">Delete?</span>
                            <button 
                              onClick={() => handleDelete(room.id)}
                              disabled={loading}
                              className="px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors shadow-sm"
                            >
                              Yes
                            </button>
                            <button 
                              onClick={() => setDeletingRoomId(null)}
                              disabled={loading}
                              className="px-3 py-1.5 bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-300 text-sm rounded hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => startEdit(room)} 
                              disabled={isAdding || editingRoom !== null || deletingRoomId !== null}
                              className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-30" 
                              title="Edit Room"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => setDeletingRoomId(room.id)}
                              disabled={isAdding || editingRoom !== null || deletingRoomId !== null}
                              className="p-2 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors disabled:opacity-30"
                              title="Delete Room"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
