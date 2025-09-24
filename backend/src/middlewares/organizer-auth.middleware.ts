import { NextFunction, Request, Response, RequestHandler } from "express";
import { createHttpsError } from "../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const isOrganizer: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (req?.user?.role != "organizer") {
        throw createHttpsError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
    }
    next();
  } catch (error) {
    next(error);
  }
};
