import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../configs/env.config";
import { ERROR } from "../constants";

export const generateToken = (payload: { id: string; role: string }) => {
  try {
    const token = jwt.sign(payload, env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    throw new Error(ERROR.TOKEN.ERROR_GENERATING_TOKEN);
  }
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET!) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
