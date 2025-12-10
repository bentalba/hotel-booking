import { z } from "zod";

export const isoDateString = z
  .string()
  .trim()
  .refine((value) => !value || !Number.isNaN(Date.parse(value)), {
    message: "Invalid date",
  });

export const searchSchema = z
  .object({
    city: z.string().trim().max(80).optional().default(""),
    guests: z.coerce.number().int().min(1).max(16).optional().default(2),
    start: isoDateString.nullable().optional().default(null),
    end: isoDateString.nullable().optional().default(null),
  })
  .refine(
    (value) => {
      if (!value.start || !value.end) return true;
      return new Date(value.start) <= new Date(value.end);
    },
    { message: "Start date must be before end date." }
  );

export const bookingSchema = z
  .object({
    roomId: z.string().min(1, "Room is required"),
    guests: z.coerce.number().int().min(1).max(16),
    startDate: isoDateString,
    endDate: isoDateString,
    notes: z.string().max(500).optional().or(z.literal("")),
  })
  .refine(
    (value) => new Date(value.startDate) < new Date(value.endDate),
    { message: "End date must be after start date." }
  );

export type SearchFilters = z.infer<typeof searchSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
