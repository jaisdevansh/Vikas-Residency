export async function getBookingStats() {
  return {
    totalBookings: 12,
    totalRooms: 5,
  };
}

export async function getRecentBookings(limit: number) {
  return [
    {
      id: "1",
      guest_name: "Rahul Sharma",
      room_name: "Premium Comfort Room",
      check_in: new Date(Date.now() - 86400000).toISOString(),
      check_out: new Date(Date.now() + 86400000 * 2).toISOString(),
      status: "confirmed"
    },
    {
      id: "2",
      guest_name: "Priya Singh",
      room_name: "Spacious Family Room",
      check_in: new Date(Date.now() + 86400000).toISOString(),
      check_out: new Date(Date.now() + 86400000 * 3).toISOString(),
      status: "pending"
    }
  ].slice(0, limit);
}

export async function getAllBookings() {
  return await getRecentBookings(100);
}

export async function createBooking(data: any) {
  return { success: true, bookingId: "new-booking-id" };
}
