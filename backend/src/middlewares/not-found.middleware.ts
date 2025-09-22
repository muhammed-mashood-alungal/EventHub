import { NextFunction, Request, Response } from "express";
import { createHttpsError } from "../utils";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const routeNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(createHttpsError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
};
