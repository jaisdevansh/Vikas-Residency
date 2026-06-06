import { sql } from '../db';
import fs from 'fs';
import path from 'path';

const dataDir = process.env.VERCEL
  ? '/tmp'
  : (typeof __dirname !== 'undefined' ? path.join(__dirname, '../../data') : './data');
const bookingsFile = path.join(dataDir, 'bookings.json');

const defaultBookings = [
  {
    id: 1,
    room_id: 1,
    room_name: "Premium Ganga View Room",
    guest_name: "Rahul Sharma",
    guest_email: "rahul@example.com",
    guest_phone: "9876543210",
    guests: 2,
    check_in: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    check_out: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "confirmed",
    price: 3500,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    room_id: 3,
    room_name: "Deluxe Comfort Room",
    guest_name: "Priya Singh",
    guest_email: "priya@example.com",
    guest_phone: "9876543211",
    guests: 2,
    check_in: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    check_out: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    price: 2500,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

function loadMockBookings(): any[] {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (fs.existsSync(bookingsFile)) {
      try {
        return JSON.parse(fs.readFileSync(bookingsFile, 'utf-8'));
      } catch (e) {
        console.error("Error reading bookings.json", e);
      }
    }
    fs.writeFileSync(bookingsFile, JSON.stringify(defaultBookings, null, 2));
  } catch (error) {
    console.error("FS fallback not available, using static seed bookings:", error);
  }
  return defaultBookings;
}

function saveMockBookings(bookings: any[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
  } catch (error) {
    console.error("FS write not available", error);
  }
}

export async function createBooking(data: {
  room_id: number;
  check_in: string;
  check_out: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guests: number;
}) {
  if (!process.env.DATABASE_URL) {
    const bookings = loadMockBookings();
    const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
    const newBooking = {
      id: newId,
      room_id: data.room_id,
      room_name: `Room #${data.room_id}`,
      guest_name: data.guest_name,
      guest_email: data.guest_email || "",
      guest_phone: data.guest_phone,
      guests: data.guests,
      check_in: data.check_in,
      check_out: data.check_out,
      status: "confirmed",
      price: 2500,
      created_at: new Date().toISOString()
    };
    bookings.push(newBooking);
    saveMockBookings(bookings);
    return newBooking;
  }

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
  if (!process.env.DATABASE_URL) {
    return loadMockBookings();
  }
  
  try {
    return await sql`
      SELECT b.*, r.name as room_name 
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      ORDER BY b.created_at DESC
    `;
  } catch (error) {
    console.error("DB Fetch bookings failed, fallback to mock", error);
    return loadMockBookings();
  }
}

export async function getRecentBookings(limit: number = 5) {
  if (!process.env.DATABASE_URL) {
    return loadMockBookings().slice(0, limit);
  }
  
  try {
    return await sql`
      SELECT b.id, b.guest_name, b.check_in, b.check_out, b.status, r.name as room_name 
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      ORDER BY b.created_at DESC 
      LIMIT ${limit}
    `;
  } catch (error) {
    console.error("DB Fetch recent bookings failed, fallback to mock", error);
    return loadMockBookings().slice(0, limit);
  }
}

export async function getBookingStats() {
  if (!process.env.DATABASE_URL) {
    const bookings = loadMockBookings();
    return {
      totalBookings: bookings.length,
      totalRooms: 5
    };
  }
  
  try {
    const totalBookingsResult = await sql`SELECT COUNT(*) FROM bookings`;
    const totalRoomsResult = await sql`SELECT COUNT(*) FROM rooms`;
    
    return {
      totalBookings: Number(totalBookingsResult[0]?.count || 0),
      totalRooms: Number(totalRoomsResult[0]?.count || 0),
    };
  } catch (error) {
    console.error("DB stats failed", error);
    return {
      totalBookings: loadMockBookings().length,
      totalRooms: 5
    };
  }
}
