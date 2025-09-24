import { z } from "zod";

export const guestSchema = z.object({
  name: z.string().trim().min(1, "Guest name is required"),
  email: z.string().trim().email("Invalid email"),
  role: z.string().trim().min(1, "Guest role is required"),
});

export const eventSchema = z
  .object({
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
    foodIncluded: z.coerce.boolean() as z.ZodBoolean,
    meals: z.object({
      breakfast: z.coerce.boolean() as z.ZodBoolean,
      lunch: z.coerce.boolean() as z.ZodBoolean,
      dinner: z.coerce.boolean() as z.ZodBoolean,
      drinks: z.coerce.boolean() as z.ZodBoolean,
    }),
    guests: z.array(guestSchema).optional(),
    capacity: z.coerce.number().min(3, "Minimum 3 Seats Needed") as z.ZodNumber,
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  })
  .refine(
    (data) => {
      console.log(data);
      if (data.foodIncluded) {
        console.log(data.meals);

        //return Object.values(data.meals).some((meal) => meal === true);
        return Object.values(data.meals).some(Boolean);
      }
      return true;
    },
    {
      message: "At least one meal must be selected when food is included",
      path: ["foodIncluded"],
    }
  );
