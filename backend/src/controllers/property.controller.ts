import { Request, Response, NextFunction } from 'express';
import * as propertyService from '../services/property.service';
import fs from 'fs';
import path from 'path';

const dataDir = process.env.VERCEL 
  ? '/tmp' 
  : path.join(__dirname, '../../data');
const roomsFile = path.join(dataDir, 'rooms.json');

let mockRooms: any[] = [];

const loadMockRooms = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (fs.existsSync(roomsFile)) {
    try {
      mockRooms = JSON.parse(fs.readFileSync(roomsFile, 'utf-8'));
      return;
    } catch (e) {
      console.error("Error reading rooms.json", e);
    }
  }
  mockRooms = [
    { id: 1, name: "Premium Ganga View Room", price: 3500, capacity: 2, image_url: "/r1.2.jpeg" },
    { id: 2, name: "Family Suite", price: 5500, capacity: 4, image_url: "/r2.jpeg" },
    { id: 3, name: "Deluxe Comfort Room", price: 2500, capacity: 2, image_url: "/r3.jpg" },
    { id: 4, name: "Standard Room", price: 1500, capacity: 2, image_url: "/r4.jpg" },
    { id: 5, name: "Budget Single Room", price: 1000, capacity: 1, image_url: "/r5.jpg" }
  ];
  saveMockRooms();
};

const saveMockRooms = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(roomsFile, JSON.stringify(mockRooms, null, 2));
};

loadMockRooms();

export const getProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.DATABASE_URL) {
      return res.json({ success: true, mocked: true, property: { id: 1, name: 'Vikas Residency', slug: 'vikas-residency', city: 'Varanasi' } });
    }
    const property = await propertyService.getPropertyDetails();
    res.json({ success: true, property });
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.DATABASE_URL) {
      return res.json({ success: true, mocked: true, rooms: mockRooms });
    }
    const rooms = await propertyService.getRooms();
    const formattedRooms = rooms.map(room => ({
      ...room,
      title: room.title || room.name
    }));
    res.json({ success: true, rooms: formattedRooms });
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    if (!process.env.DATABASE_URL) {
      const roomIndex = mockRooms.findIndex(r => r.id === Number(id));
      if (roomIndex === -1) return res.status(404).json({ success: false, error: "Mock room not found" });
      mockRooms[roomIndex] = { ...mockRooms[roomIndex], ...data };
      saveMockRooms();
      return res.json({ success: true, room: mockRooms[roomIndex] });
    }

    const room = await propertyService.updateRoom(Number(id), data);
    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found or database not configured" });
    }
    res.json({ success: true, room });
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    
    if (!process.env.DATABASE_URL) {
      const newId = mockRooms.length > 0 ? Math.max(...mockRooms.map(r => r.id)) + 1 : 1;
      const newRoom = { id: newId, ...data };
      mockRooms.push(newRoom);
      saveMockRooms();
      return res.json({ success: true, room: newRoom });
    }

    const room = await propertyService.createRoom(data);
    if (!room) {
      return res.status(400).json({ success: false, error: "Failed to create room" });
    }
    res.json({ success: true, room });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    if (!process.env.DATABASE_URL) {
      const roomIndex = mockRooms.findIndex(r => r.id === Number(id));
      if (roomIndex === -1) return res.status(404).json({ success: false, error: "Mock room not found" });
      mockRooms.splice(roomIndex, 1);
      saveMockRooms();
      return res.json({ success: true, message: "Room deleted successfully" });
    }

    const deleted = await propertyService.deleteRoom(Number(id));
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Room not found or database not configured" });
    }
    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const setup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(400).json({ error: "No DATABASE_URL configured." });
    }
    await propertyService.initializeDatabase();
    res.json({ success: true, message: "Database tables and seed data created successfully!" });
  } catch (error) {
    next(error);
  }
};
