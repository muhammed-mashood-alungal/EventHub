import { z } from "zod";

export const guestSchema = z.object({
  name: z.string().trim().min(1, "Guest name is required"),
  email: z.string().trim().email("Invalid email"),
  role: z.string().trim().min(1, "Guest role is required"),
});

export const eventCreateSchema = z
  .object({
    organizerId: z.string().trim().min(1, "Organizer ID is required"),

    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title must be less than 200 characters"),

    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(1000, "Description must be less than 1000 characters"),

    venue: z
      .string()
      .trim()
      .min(1, "Venue is required")
      .max(200, "Venue must be less than 200 characters"),

    category: z.enum([
      "Hackathon",
      "Concert",
      "Conference",
      "Workshop",
      "Other",
    ]),

    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),

    slug: z.string().trim().min(1, "Slug is required"),

    foodIncluded: z.coerce.boolean(),

    meals: z
      .object({
        breakfast: z.coerce.boolean().optional(),
        lunch: z.coerce.boolean().optional(),
        dinner: z.coerce.boolean().optional(),
        drinks: z.coerce.boolean().optional(),
      })
      .optional()
      .default({}),

    guests: z.array(guestSchema).optional(),

    capacity: z.coerce
      .number()
      .min(3, "Minimum 3 Seats Needed")
      .max(100000, "Capacity too large"),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  })
  .refine(
    (data) => {
      if (data.foodIncluded) {
        return data.meals && Object.values(data.meals).some(Boolean);
      }
      return true;
    },
    {
      message: "At least one meal must be selected when food is included",
      path: ["meals"],
    }
  );

export const eventUpdateSchema = eventCreateSchema
  .partial()
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        return new Date(data.endTime) > new Date(data.startTime);
      }
      return true;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  )
  .refine(
    (data) => {
      if (data.foodIncluded) {
        return data.meals && Object.values(data.meals).some(Boolean);
      }
      return true;
    },
    {
      message: "At least one meal must be selected when food is included",
      path: ["meals"],
    }
  );
