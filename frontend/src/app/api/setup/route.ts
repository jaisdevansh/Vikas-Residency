import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/backend/services/property.service';

export const runtime = 'edge';

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No DATABASE_URL configured. Please add it to your .env.local file." }, { status: 400 });
  }

  try {
    await initializeDatabase();
    return NextResponse.json({ success: true, message: "Database tables and seed data created successfully!" });
  } catch (error) {
    console.error('Setup DB Error:', error);
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}
