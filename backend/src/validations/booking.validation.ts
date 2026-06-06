import { z } from 'zod';

export const createBookingSchema = z.object({
  body: z.object({
    room_id: z.number().positive(),
    check_in: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use YYYY-MM-DD"),
    check_out: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use YYYY-MM-DD"),
    guest_name: z.string().min(2, "Name must be at least 2 characters long"),
    guest_email: z.union([z.string().email("Invalid email format"), z.literal("")]).optional(),
    guest_phone: z.string().min(10, "Phone must be at least 10 characters long"),
    guests: z.number().int().positive().min(1).max(10),
  }).refine((data) => new Date(data.check_in) < new Date(data.check_out), {
    message: "check_out date must be after check_in date",
    path: ["check_out"],
  })
});
