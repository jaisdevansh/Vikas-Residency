import RoomsAdminClient from "./RoomsAdminClient";

import { getRooms } from "@/backend/services/property.service";

export default async function AdminRoomsPage() {
  let rooms = [];
  try {
    rooms = await getRooms();
  } catch (err) {
    console.error("Failed to fetch rooms from DB:", err);
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
