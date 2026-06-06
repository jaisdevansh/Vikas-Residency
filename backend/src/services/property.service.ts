import { sql } from '../db';

export async function getPropertyDetails() {
  if (!process.env.DATABASE_URL) return null;
  
  const result = await sql`
    SELECT * FROM properties WHERE slug = 'vikas-residency' LIMIT 1
  `;
  return result.length > 0 ? result[0] : null;
}

export async function getRooms() {
  if (!process.env.DATABASE_URL) return [];
  
  return await sql`
    SELECT * FROM rooms ORDER BY id ASC
  `;
}

export async function updateRoom(id: number, data: { name?: string; price?: number; capacity?: number; image_url?: string; status?: string }) {
  if (!process.env.DATABASE_URL) return null;
  
  // Build a dynamic query for partial updates
  const updates: any[] = [];
  if (data.name !== undefined) updates.push(sql`name = ${data.name}`);
  if (data.price !== undefined) updates.push(sql`price = ${data.price}`);
  if (data.capacity !== undefined) updates.push(sql`capacity = ${data.capacity}`);
  if (data.image_url !== undefined) updates.push(sql`image_url = ${data.image_url}`);

  if (updates.length === 0) return await sql`SELECT * FROM rooms WHERE id = ${id}`;

  const setClause = updates.reduce((acc, current, i) => i === 0 ? current : sql`${acc}, ${current}`);

  const result = await sql`
    UPDATE rooms 
    SET ${setClause}
    WHERE id = ${id}
    RETURNING *
  `;
  return result.length > 0 ? result[0] : null;
}

export async function createRoom(data: { name: string; price: number; capacity: number; image_url?: string }) {
  if (!process.env.DATABASE_URL) return null;
  
  const result = await sql`
    INSERT INTO rooms (property_id, name, price, capacity, image_url)
    VALUES (1, ${data.name}, ${data.price}, ${data.capacity}, ${data.image_url || null})
    RETURNING *
  `;
  return result.length > 0 ? result[0] : null;
}

export async function deleteRoom(id: number) {
  if (!process.env.DATABASE_URL) return false;
  
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
  
  // Safe column add for existing DBs
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
    ON CONFLICT (id) DO NOTHING
    RETURNING id;
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
