import Link from "next/link";

export const runtime = "edge";

import { getAllBookings } from "@/backend/services/booking.service";

async function fetchBookings() {
  try {
    return await getAllBookings();
  } catch (error) {
    console.error("Fetch Bookings Error", error);
    return [];
  }
}

export default async function AdminBookings() {
  const bookings = await fetchBookings();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Bookings</h2>
      </div>

      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">ID</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Guest Details</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Room & Guests</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Stay Dates</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No bookings found or database not configured.
                  </td>
                </tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">#{booking.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 dark:text-white">{booking.guest_name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{booking.guest_email}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{booking.guest_phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-900 dark:text-white font-medium">{booking.room_name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{booking.guests} Guest(s)</div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      <div><span className="text-xs text-gray-500 uppercase tracking-wider">In:</span> {new Date(booking.check_in).toLocaleDateString()}</div>
                      <div className="mt-1"><span className="text-xs text-gray-500 uppercase tracking-wider">Out:</span> {new Date(booking.check_out).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
