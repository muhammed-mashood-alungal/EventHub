import z from "zod";
import { ERROR } from "../constants";

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signupSchema = z.object({
  name: z.string().min(3, { message: ERROR.USER.USERNAME_TOO_SHORT }),
  email: z.string().refine((val) => emailReg.test(val), {
    message: ERROR.USER.INVALID_EMAIL,
  }),
  password: z.string().min(6, { message: ERROR.USER.PASSWORD_TOO_SHORT }),
  phone: z
    .string()
    .min(10, { message: ERROR.USER.PHONE_TOO_SHORT })
    .max(15, { message: ERROR.USER.PHONE_TOO_LONG }),
  role: z.enum(["user", "organizer"]).optional(),
  organization: z
    .object({
      name: z.string().min(1, { message: ERROR.ORGANIZATION.NAME_REQUIRED }),
      address: z
        .string()
        .min(1, { message: ERROR.ORGANIZATION.ADDRESS_REQUIRED }),
      website: z.string().refine(
        (val) => {
          try {
            new URL(val);
            return true;
          } catch {
            return false;
          }
        },
        { message: ERROR.ORGANIZATION.INVALID_URL_FORMAT }
      ),
    })
    .optional(),
});

export const signinSchema = z.object({
  email: z.string().refine((val) => emailReg.test(val), {
    message: ERROR.USER.INVALID_EMAIL,
  }),
  password: z.string().min(6, { message: ERROR.USER.PASSWORD_TOO_SHORT }),
});
