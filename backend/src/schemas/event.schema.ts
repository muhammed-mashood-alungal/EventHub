import { z } from "zod";
import { ERROR } from "../constants";

export const guestSchema = z.object({
  name: z.string().trim().min(1, ERROR.EVENT.GUEST_NAME_REQ),
  email: z.string().trim().email(ERROR.EVENT.GUEST_EMAIL_REQ),
  role: z.string().trim().min(1, ERROR.EVENT.ROLE_REQ),
});

export const eventCreateSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, ERROR.EVENT.TITLE_REQ)
      .max(200, ERROR.EVENT.TITLE_MAX_200),

    description: z
      .string()
      .trim()
      .min(1, ERROR.EVENT.DESCRIPTION_REQ)
      .max(1000, ERROR.EVENT.DESCRIPTION_MAX_1000),

    venue: z
      .string()
      .trim()
      .min(1, ERROR.EVENT.VENUE_REQ)
      .max(200, ERROR.EVENT.VENUE_MAX_200),

    category: z.enum([
      "Hackathon",
      "Concert",
      "Conference",
      "Workshop",
      "Other",
    ]),

    startTime: z.string().min(1, ERROR.EVENT.START_TIME_REQ),
    endTime: z.string().min(1, ERROR.EVENT.END_TIME_REQ),
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
      .min(3,ERROR.EVENT.MIN_3_SEAT)
      .max(100000, ERROR.EVENT.CAPACITY_TOO_LARGE),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: ERROR.EVENT.END_TIME_AFTER_START_TIME,
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
      message:ERROR.EVENT.END_TIME_AFTER_START_TIME,
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
      message:ERROR.EVENT.END_TIME_AFTER_START_TIME,
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
      message: ERROR.EVENT.END_TIME_AFTER_START_TIME,
      path: ["meals"],
    }
  );
