import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Basic HTML sanitizer to prevent XSS in stored data
function sanitizeHTML(str: string) {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { room_id, check_in, check_out, guest_name, guest_email, guest_phone, guests } = body;

    // Validate inputs
    if (!room_id || !check_in || !check_out) {
      return NextResponse.json({ error: 'Missing required fields (room_id, check_in, check_out)' }, { status: 400 });
    }

    // Sanitize user inputs
    guest_name = sanitizeHTML(guest_name);
    guest_email = sanitizeHTML(guest_email);
    guest_phone = sanitizeHTML(guest_phone);
    guests = parseInt(guests, 10) || 1;

    // Strict regex validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (guest_email && !emailRegex.test(guest_email)) {
      return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 });
    }

    // Regex validation for phone numbers (allows +, -, spaces, parentheses, numbers)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (guest_phone && !phoneRegex.test(guest_phone)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    // Validate guest bounds
    if (guests < 1 || guests > 15) {
      return NextResponse.json({ error: 'Guest count must be between 1 and 15' }, { status: 400 });
    }

    // Forward the payload to the Express backend running on port 5000
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";
    const backendRes = await fetch(`${backendUrl}/api/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room_id,
        check_in,
        check_out,
        guest_name,
        guest_email: guest_email || "",
        guest_phone,
        guests
      })
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json();
      return NextResponse.json(
        { error: errorData.error || 'Failed to create booking in backend' },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
