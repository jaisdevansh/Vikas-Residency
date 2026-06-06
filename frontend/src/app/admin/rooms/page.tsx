import RoomsAdminClient from "./RoomsAdminClient";

export const runtime = "edge";

export default async function AdminRoomsPage() {
  let rooms = [];
  try {
    const res = await fetch('http://127.0.0.1:5000/api/rooms', { cache: 'no-store' });
    const data = await res.json();
    if (data.success && data.rooms) {
      rooms = data.rooms;
    }
  } catch (err) {
    console.error("Failed to fetch rooms from backend API:", err);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rooms Management</h1>
          <p className="text-gray-500 dark:text-white/60">Update room pricing, capacity, and cover images.</p>
        </div>
      </div>
      
      <RoomsAdminClient initialRooms={rooms} />
    </div>
  );
}
