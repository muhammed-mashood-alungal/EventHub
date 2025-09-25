import { z } from "zod";
import { ERROR } from "../constants/error-messages";

export const guestSchema = z.object({
  name: z.string().trim().min(1, ERROR.EVENT.GUEST_NAME_REQUIRED),
  email: z.string().trim().email(ERROR.EVENT.GUEST_EMAIL_INVALID),
  role: z.string().trim().min(1, ERROR.EVENT.GUEST_ROLE_REQUIRED),
});

export const eventSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, ERROR.EVENT.TITLE_REQUIRED)
      .max(200, ERROR.EVENT.TITLE_MAX),
    description: z
      .string()
      .trim()
      .min(1, ERROR.EVENT.DESCRIPTION_REQUIRED)
      .max(1000, ERROR.EVENT.DESCRIPTION_MAX),
    venue: z
      .string()
      .trim()
      .min(1, ERROR.EVENT.VENUE_REQUIRED)
      .max(200, ERROR.EVENT.VENUE_MAX),
    category: z.enum([
      "Hackathon",
      "Concert",
      "Conference",
      "Workshop",
      "Other",
    ]),
    startTime: z.string().min(1, ERROR.EVENT.START_TIME_REQUIRED),
    endTime: z.string().min(1, ERROR.EVENT.END_TIME_REQUIRED),
    foodIncluded: z.coerce.boolean() as z.ZodBoolean,
    meals: z.object({
      breakfast: z.coerce.boolean() as z.ZodBoolean,
      lunch: z.coerce.boolean() as z.ZodBoolean,
      dinner: z.coerce.boolean() as z.ZodBoolean,
      drinks: z.coerce.boolean() as z.ZodBoolean,
    }),
    guests: z.array(guestSchema).optional(),
    capacity: z.coerce.number().min(3, ERROR.EVENT.MIN_CAPACITY) as z.ZodNumber,
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: ERROR.EVENT.END_TIME_AFTER,
    path: ["endTime"],
  })
  .refine(
    (data) => {
      if (data.foodIncluded) {
        return Object.values(data.meals).some(Boolean);
      }
      return true;
    },
    {
      message: ERROR.EVENT.MEAL_REQUIRED,
      path: ["foodIncluded"],
    }
  );
