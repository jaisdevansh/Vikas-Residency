import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes';
import propertyRoutes from './routes/property.routes';
import roomsRoutes from './routes/rooms.routes';
import bookingRoutes from './routes/booking.routes';
import uploadRoutes from './routes/upload.routes';
import reviewRoutes from './routes/review.routes';
import galleryRoutes from './routes/gallery.routes';
import blogsRoutes from './routes/blogs.routes';
import path from 'path';

import { errorHandler } from './middlewares/error.middleware';
import logger from './utils/logger';
import { AppError } from './utils/AppError';

const app = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false, // Needed to serve images cross-origin
}));
app.use(cors({
  origin: true,
  credentials: true
}));

// Serve static uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Logging Middleware
app.use(morgan('dev', {
  stream: { write: (message) => logger.http(message.trim()) }
}));

// Body Parsing
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/setup', propertyRoutes); // Since setup is in property controller

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

export default app;
