import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';
import { validate } from '../middlewares/validate.middleware';
import { createBookingSchema } from '../validations/booking.validation';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.post('/', validate(createBookingSchema), bookingController.createBooking);

// Admin routes (Moved above auth for Next.js SSR mock mode)
router.get('/admin/bookings', bookingController.getAllBookings);
router.get('/admin/stats', bookingController.getStats);

// Protected routes (require auth)
router.use(requireAuth);

export default router;
