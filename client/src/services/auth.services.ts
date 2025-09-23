import { AxiosError } from "axios";
import type { ILoginInput, ISignupInput } from "../types/auth.types";
import { authInstance } from "../api/api.instances";

const AuthService = {
  register: async (data: Omit<ISignupInput,'confirmPassword'>) => {
    try {
      const response = await authInstance.post("/signup", data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to register";
      throw new Error(message);
    }
  },
  login: async (data: ILoginInput) => {
    try {
      const response = await authInstance.post("/signin", data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to login";
      throw new Error(message);
    }
  },
  logout: async () => {
    try {
      const response = await authInstance.post("/logout");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to logout";
      throw new Error(message);
    }
  },
  authMe: async () => {
    try {
      const response = await authInstance.get("/me");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to fetch user";
      throw new Error(message);
    }
  },
};

export default AuthService;
