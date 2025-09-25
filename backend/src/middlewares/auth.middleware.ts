import { NextFunction, Request, Response, RequestHandler } from "express";
import { createHttpsError, isTokenRevoked, verifyToken } from "../utils";
import { StatusCodes } from "http-status-codes";
import { ERROR } from "../constants";
import { IUserTokenPayload } from "../types";


export const authMiddleware: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    console.log("inside auth middleware =========================Token: ", token);
    if (!token) {
      return next(
        createHttpsError(
          StatusCodes.UNAUTHORIZED,
          ERROR.TOKEN.NO_TOKEN_PROVIDED
        )
      );
    }
    const isRevoked = await isTokenRevoked(token);
    if (isRevoked) {
       throw createHttpsError(StatusCodes.UNAUTHORIZED, ERROR.TOKEN.TOKEN_REVOKED);
    }
    const user = verifyToken(token);
    if (!user) {
      throw createHttpsError(StatusCodes.UNAUTHORIZED, ERROR.TOKEN.INVALID_TOKEN);
     
    }
    req.user = user as IUserTokenPayload;
    next();
  } catch (error) {
    next(error);
  }
};
