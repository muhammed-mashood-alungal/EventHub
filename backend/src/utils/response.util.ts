import { Response } from "express";

export const successResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = {}
) => {
  res.status(status).json({
    status: "success",
    message,
    ...data,
  });
};


export const errorResponse = (
  res: Response,
  status: number,
  message: string,
  error: any = {}
) => {
  res.status(status).json({
    status: "error",
    message,
    error,
  });
};
