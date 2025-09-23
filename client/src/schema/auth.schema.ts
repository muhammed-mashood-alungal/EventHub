import { z } from "zod";
import { ERROR } from "../constants/error-messages";

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const loginSchema = z.object({
  email: z.string().refine((val) => emailReg.test(val), {
    message: ERROR.USER.INVALID_EMAIL,
  }),
  password: z.string().min(6, { message: ERROR.USER.INVALID_PASSWORD }),
});

export const signupSchema = z
  .object({
    name: z.string().trim().min(3, { message: ERROR.USER.REQUIRED_EMAIL }),
    email: z.string().refine((val) => emailReg.test(val), {
      message: ERROR.USER.INVALID_EMAIL,
    }),
    password: z
      .string()
      .trim()
      .min(6, { message: ERROR.USER.INVALID_PASSWORD }),
    confirmPassword: z.string().min(6),
    phone: z
      .string()
      .trim()
      .min(10, { message: ERROR.USER.PHONE_NUMBER_TOO_SHORT })
      .max(15, { message: ERROR.USER.PHONE_NUMBER_TOO_LONG }),
    role: z.enum(["user", "organizer"]).optional(),
    organization: z
      .object({
        name: z
          .string()
          .trim()
          .min(1, { message: ERROR.USER.ORGANIZATION_NAME_REQUIRED }),
        address: z
          .string()
          .trim()
          .min(1, { message: ERROR.USER.ORGANIZATION_ADDRESS_REQUIRED }),
        website: z.string().refine(
          (val) => {
            try {
              new URL(val);
              return true;
            } catch {
              return false;
            }
          },
          { message: ERROR.USER.INVALID_WEBSITE_URL }
        ),
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR.USER.PASSWORDS_DO_NOT_MATCH,
    path: ["confirmPassword"],
  });
