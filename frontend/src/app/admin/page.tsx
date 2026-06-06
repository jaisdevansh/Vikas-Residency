import Link from "next/link";
import { CalendarDays, Users, Bed, CreditCard } from "lucide-react";

export const runtime = "edge";

async function getStats() {
  try {
    const res = await fetch('http://127.0.0.1:5000/api/booking/admin/stats', { cache: 'no-store' });
    const data = await res.json();
    if (data.success && data.stats) {
      return data.stats;
    }
    return null;
  } catch (error) {
    console.error("Dashboard Stats Error", error);
    return null;
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {!stats && (
        <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-700 dark:text-yellow-200 p-4 rounded-xl">
          <p className="font-bold">Backend API Error</p>
          <p className="text-sm mt-1">Make sure the Express backend server is running.</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <CalendarDays size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Bookings</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalBookings || 0}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <Bed size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Rooms</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalRooms || 0}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Active Guests</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.activeGuests ?? '--'}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Revenue (MTD)</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.revenue || '--'}</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm text-accent hover:underline font-medium">View All</Link>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Guest</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Room</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Dates</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {!stats?.recentBookings?.length ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No recent bookings found.
                  </td>
                </tr>
              ) : (
                stats.recentBookings.map((booking: any) => (
                  <tr key={booking.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{booking.guest_name}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{booking.room_name}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
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
