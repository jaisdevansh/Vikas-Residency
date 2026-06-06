import { Request, Response, NextFunction } from 'express';
import * as bookingService from '../services/booking.service';
import { AppError } from '../utils/AppError';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(__dirname, '../../data');
const bookingsFile = path.join(dataDir, 'bookings.json');
const roomsFile = path.join(dataDir, 'rooms.json');

let mockBookings: any[] = [];

const loadMockBookings = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (fs.existsSync(bookingsFile)) {
    try {
      mockBookings = JSON.parse(fs.readFileSync(bookingsFile, 'utf-8'));
      return;
    } catch (e) {
      console.error("Error reading bookings.json", e);
    }
  }
  
  mockBookings = [
    {
      id: 1,
      room_id: 1,
      room_name: "Premium Ganga View Room",
      guest_name: "Rahul Sharma",
      guest_email: "rahul@example.com",
      guest_phone: "9876543210",
      guests: 2,
      check_in: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      check_out: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // tomorrow
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
  saveMockBookings();
};

const saveMockBookings = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(bookingsFile, JSON.stringify(mockBookings, null, 2));
};

loadMockBookings();

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.DATABASE_URL) {
      const data = req.body;
      const newId = mockBookings.length > 0 ? Math.max(...mockBookings.map(b => b.id)) + 1 : 1;
      
      // We don't have the room name easily available without reading rooms.json, but let's fake it
      const newBooking = {
        id: newId,
        ...data,
        room_name: `Room #${data.room_id}`,
        status: 'confirmed',
        created_at: new Date().toISOString()
      };
      
      mockBookings.push(newBooking);
      saveMockBookings();
      
      return res.status(201).json({ success: true, mocked: true, booking: newBooking });
    }

    const data = req.body;
    const result = await bookingService.createBooking(data);
    
    if (!result) {
      return next(new AppError('Room is not available for these dates', 409));
    }
    
    res.status(201).json({ success: true, booking: result });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.DATABASE_URL) {
      return res.json({ success: true, bookings: mockBookings });
    }
    const bookings = await bookingService.getAllBookings();
    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.DATABASE_URL) {
      // Compute stats from JSON files
      let totalRooms = 0;
      if (fs.existsSync(roomsFile)) {
        try {
          const roomsData = JSON.parse(fs.readFileSync(roomsFile, 'utf-8'));
          totalRooms = roomsData.length;
        } catch (e) {}
      }

      const totalBookings = mockBookings.length;
      
      // Calculate Active Guests (guests currently staying)
      const now = new Date();
      const activeGuests = mockBookings.reduce((sum, booking) => {
        const checkIn = new Date(booking.check_in);
        const checkOut = new Date(booking.check_out);
        if (booking.status === 'confirmed' && now >= checkIn && now <= checkOut) {
          return sum + (booking.guests || 1);
        }
        return sum;
      }, 0);

      // Calculate Monthly Revenue (from confirmed bookings)
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const revenue = mockBookings.reduce((sum, booking) => {
        const checkIn = new Date(booking.check_in);
        if (booking.status === 'confirmed' && checkIn.getMonth() === currentMonth && checkIn.getFullYear() === currentYear) {
          // If price exists in booking, add it. Otherwise fake a 2500 price.
          return sum + (booking.price || 2500); 
        }
        return sum;
      }, 0);

      const recentBookings = [...mockBookings].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

      return res.json({
        success: true,
        stats: {
          totalBookings,
          totalRooms,
          activeGuests,
          revenue: `₹${revenue.toLocaleString('en-IN')}`,
          recentBookings
        }
      });
    }

    const stats = await bookingService.getBookingStats();
    if (!stats) return res.json({ stats: null });
    
    const recentBookings = await bookingService.getRecentBookings(5);
    res.json({ stats: { ...stats, recentBookings, activeGuests: '--', revenue: '--' } });
  } catch (error) {
    next(error);
  }
};
