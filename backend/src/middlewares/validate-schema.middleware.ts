import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils";

export const validateSchema = (schema: ZodType<any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

      return errorResponse(res, StatusCodes.BAD_REQUEST, errors);
    }

    req.body = result.data;

    next();
  };
};
