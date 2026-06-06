import { neon } from '@neondatabase/serverless';

// Fallback for development without DB URL
const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@dummy.neon.tech/neondb";

// neon() creates a connection that works perfectly in Edge Runtimes
export const sql = neon(connectionString);

/**
 * DATABASE SCHEMA REFERENCE (Execute this in your Neon console)
 * 
 * CREATE TABLE properties (
 *   id SERIAL PRIMARY KEY,
 *   name VARCHAR(255) NOT NULL,
 *   slug VARCHAR(255) UNIQUE NOT NULL
 * );
 * 
 * CREATE TABLE rooms (
 *   id SERIAL PRIMARY KEY,
 *   property_id INTEGER REFERENCES properties(id),
 *   name VARCHAR(255) NOT NULL,
 *   price DECIMAL(10, 2) NOT NULL,
 *   capacity INTEGER NOT NULL
 * );
 * 
 * CREATE TABLE bookings (
 *   id SERIAL PRIMARY KEY,
 *   room_id INTEGER REFERENCES rooms(id),
 *   guest_name VARCHAR(255) NOT NULL,
 *   guest_email VARCHAR(255) NOT NULL,
 *   guest_phone VARCHAR(20) NOT NULL,
 *   guests INTEGER NOT NULL,
 *   check_in DATE NOT NULL,
 *   check_out DATE NOT NULL,
 *   status VARCHAR(50) DEFAULT 'pending'
 * );
 * 
 * CREATE INDEX idx_rooms_property ON rooms(property_id);
 * CREATE INDEX idx_booking_dates ON bookings(room_id, check_in, check_out);
 * CREATE INDEX idx_booking_status ON bookings(status);
 */
