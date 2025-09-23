import type z from "zod";
import type { loginSchema, signupSchema } from "../schema/auth.schema";

export type ILoginInput = z.infer<typeof loginSchema>;
export type ISignupInput = z.infer<typeof signupSchema>;
export type IRoles = "user" | "organizer";