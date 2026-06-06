import { sql } from '../db';

export async function createBooking(data: {
  room_id: number;
  check_in: string;
  check_out: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guests: number;
}) {
  const result = await sql`
    INSERT INTO bookings (room_id, check_in, check_out, status, guest_name, guest_email, guest_phone, guests)
    SELECT ${data.room_id}, ${data.check_in}, ${data.check_out}, 'confirmed', ${data.guest_name || 'Guest'}, ${data.guest_email || ''}, ${data.guest_phone || ''}, ${data.guests || 1}
    WHERE NOT EXISTS (
      SELECT id FROM bookings
      WHERE room_id = ${data.room_id}
      AND status != 'cancelled'
      AND (
        (check_in <= ${data.check_in} AND check_out > ${data.check_in}) OR
        (check_in < ${data.check_out} AND check_out >= ${data.check_out}) OR
        (check_in >= ${data.check_in} AND check_out <= ${data.check_out})
      )
    )
    RETURNING id, status
  `;

  return result.length > 0 ? result[0] : null;
}

export async function getAllBookings() {
  if (!process.env.DATABASE_URL) return [];
  
  return await sql`
    SELECT b.*, r.name as room_name 
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    ORDER BY b.created_at DESC
  `;
}

export async function getRecentBookings(limit: number = 5) {
  if (!process.env.DATABASE_URL) return [];
  
  return await sql`
    SELECT b.id, b.guest_name, b.check_in, b.check_out, b.status, r.name as room_name 
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    ORDER BY b.created_at DESC 
    LIMIT ${limit}
  `;
}

export async function getBookingStats() {
  if (!process.env.DATABASE_URL) return null;
  
  const totalBookingsResult = await sql`SELECT COUNT(*) FROM bookings`;
  const totalRoomsResult = await sql`SELECT COUNT(*) FROM rooms`;
  
  return {
    totalBookings: totalBookingsResult[0]?.count || 0,
    totalRooms: totalRoomsResult[0]?.count || 0,
  };
}
