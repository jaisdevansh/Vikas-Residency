import { sql } from '../db';
import fs from 'fs';
import path from 'path';

const dataDir = process.env.VERCEL
  ? '/tmp'
  : (typeof __dirname !== 'undefined' ? path.join(__dirname, '../../data') : './data');
const roomsFile = path.join(dataDir, 'rooms.json');

const defaultRooms = [
  { id: 1, name: "Premium Ganga View Room", price: 3500, capacity: 2, image_url: "/r1.2.jpeg" },
  { id: 2, name: "Family Suite", price: 5500, capacity: 4, image_url: "/r2.jpeg" },
  { id: 3, name: "Deluxe Comfort Room", price: 2500, capacity: 2, image_url: "/r2.1.jpeg" },
  { id: 4, name: "Standard Room", price: 1500, capacity: 2, image_url: "/r2.3.jpeg" },
  { id: 5, name: "Budget Single Room", price: 1000, capacity: 1, image_url: "/r2.4.jpeg" }
];

function loadMockRooms(): any[] {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (fs.existsSync(roomsFile)) {
      try {
        return JSON.parse(fs.readFileSync(roomsFile, 'utf-8'));
      } catch (e) {
        console.error("Error reading rooms.json", e);
      }
    }
    fs.writeFileSync(roomsFile, JSON.stringify(defaultRooms, null, 2));
  } catch (error) {
    console.error("FS fallback not available, using static seed rooms:", error);
  }
  return defaultRooms;
}

function saveMockRooms(rooms: any[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(roomsFile, JSON.stringify(rooms, null, 2));
  } catch (error) {
    console.error("FS write not available", error);
  }
}

export async function getPropertyDetails() {
  if (!process.env.DATABASE_URL) {
    return { id: 1, name: 'Vikas Residency', slug: 'vikas-residency', city: 'Varanasi' };
  }
  
  try {
    const result = await sql`
      SELECT * FROM properties WHERE slug = 'vikas-residency' LIMIT 1
    `;
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Failed to fetch property details from DB", error);
    return { id: 1, name: 'Vikas Residency', slug: 'vikas-residency', city: 'Varanasi' };
  }
}

export async function getRooms() {
  if (!process.env.DATABASE_URL) {
    return loadMockRooms();
  }
  
  try {
    return await sql`
      SELECT * FROM rooms ORDER BY id ASC
    `;
  } catch (error) {
    console.error("Failed to fetch rooms from DB, fallback to mock", error);
    return loadMockRooms();
  }
}

export async function updateRoom(id: number, data: { name?: string; price?: number; capacity?: number; image_url?: string }) {
  if (!process.env.DATABASE_URL) {
    const rooms = loadMockRooms();
    const idx = rooms.findIndex(r => r.id === id);
    if (idx === -1) return null;
    rooms[idx] = { ...rooms[idx], ...data };
    saveMockRooms(rooms);
    return rooms[idx];
  }
  
  const fields: string[] = [];
  const values: any[] = [];
  
  if (data.name !== undefined) {
    fields.push(`name = $${fields.length + 1}`);
    values.push(data.name);
  }
  if (data.price !== undefined) {
    fields.push(`price = $${fields.length + 1}`);
    values.push(Number(data.price));
  }
  if (data.capacity !== undefined) {
    fields.push(`capacity = $${fields.length + 1}`);
    values.push(Number(data.capacity));
  }
  if (data.image_url !== undefined) {
    fields.push(`image_url = $${fields.length + 1}`);
    values.push(data.image_url);
  }

  if (fields.length === 0) {
    const result = await sql`SELECT * FROM rooms WHERE id = ${id}`;
    return result.length > 0 ? result[0] : null;
  }

  values.push(id);
  const query = `
    UPDATE rooms 
    SET ${fields.join(', ')}
    WHERE id = $${fields.length + 1}
    RETURNING *
  `;
  
  try {
    const result = await (sql as any)(query, values);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("DB updateRoom failed, fallback to mock:", error);
    const rooms = loadMockRooms();
    const idx = rooms.findIndex(r => r.id === id);
    if (idx === -1) return null;
    rooms[idx] = { ...rooms[idx], ...data };
    saveMockRooms(rooms);
    return rooms[idx];
  }
}

export async function createRoom(data: { name: string; price: number; capacity: number; image_url?: string }) {
  if (!process.env.DATABASE_URL) {
    const rooms = loadMockRooms();
    const newId = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
    const newRoom = { id: newId, ...data };
    rooms.push(newRoom);
    saveMockRooms(rooms);
    return newRoom;
  }
  
  const result = await sql`
    INSERT INTO rooms (property_id, name, price, capacity, image_url)
    VALUES (1, ${data.name}, ${data.price}, ${data.capacity}, ${data.image_url || null})
    RETURNING *
  `;
  return result.length > 0 ? result[0] : null;
}

export async function deleteRoom(id: number) {
  if (!process.env.DATABASE_URL) {
    const rooms = loadMockRooms();
    const filtered = rooms.filter(r => r.id !== id);
    saveMockRooms(filtered);
    return true;
  }
  
  const result = await sql`
    DELETE FROM rooms WHERE id = ${id} RETURNING id
  `;
  return result.length > 0;
}

export async function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("No DATABASE_URL configured");
  }

  // 1. Create properties table
  await sql`
    CREATE TABLE IF NOT EXISTS properties (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL
    );
  `;

  // 2. Create rooms table
  await sql`
    CREATE TABLE IF NOT EXISTS rooms (
      id SERIAL PRIMARY KEY,
      property_id INTEGER REFERENCES properties(id),
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      capacity INTEGER NOT NULL,
      image_url VARCHAR(500)
    );
  `;
  
  try {
    await sql`ALTER TABLE rooms ADD COLUMN image_url VARCHAR(500);`;
  } catch (e) {
    // Column likely exists
  }

  // 3. Create bookings table
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      room_id INTEGER REFERENCES rooms(id),
      guest_name VARCHAR(255) NOT NULL,
      guest_email VARCHAR(255) NOT NULL,
      guest_phone VARCHAR(20) NOT NULL,
      guests INTEGER NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // 3.5. Create gallery_images table
  await sql`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id SERIAL PRIMARY KEY,
      image_url VARCHAR(500) NOT NULL,
      caption VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // 3.6. Create blogs table
  await sql`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      date VARCHAR(50) NOT NULL,
      category VARCHAR(50) NOT NULL,
      category_label VARCHAR(100) NOT NULL,
      read_time VARCHAR(50) NOT NULL,
      image_url VARCHAR(500) NOT NULL,
      author_name VARCHAR(100) NOT NULL,
      author_role VARCHAR(100) NOT NULL,
      intro TEXT NOT NULL,
      paragraphs TEXT NOT NULL,
      local_tips TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // 4. Create Indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_rooms_property ON rooms(property_id);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_booking_dates ON bookings(room_id, check_in, check_out);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_booking_status ON bookings(status);`;

  // 5. Seed default property if missing
  await sql`
    INSERT INTO properties (id, name, slug) 
    VALUES (1, 'Vikas Residency', 'vikas-residency')
    ON CONFLICT (id) DO NOTHING;
  `;

  // 6. Seed default rooms if missing
  await sql`
    INSERT INTO rooms (id, property_id, name, price, capacity, image_url)
    VALUES 
      (1, 1, 'Premium Ganga View Room', 3500.00, 2, '/r1.2.jpeg'),
      (2, 1, 'Family Suite', 5500.00, 4, '/r2.jpeg'),
      (3, 1, 'Deluxe Comfort Room', 2500.00, 2, '/r3.jpg'),
      (4, 1, 'Standard Room', 1500.00, 2, '/r4.jpg'),
      (5, 1, 'Budget Single Room', 1000.00, 1, '/r5.jpg')
    ON CONFLICT (id) DO NOTHING;
  `;

  return true;
}
