import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const errorHandler = (
  err: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = ReasonPhrases.INTERNAL_SERVER_ERROR;

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(err);

  res.status(statusCode).json({ success: false, message: message });
};
