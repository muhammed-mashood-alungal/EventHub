import { NextFunction, Request, Response } from "express";

export interface IEventController {
  createEvent(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMyEvents(req: Request, res: Response, next: NextFunction): Promise<void>;
  getEventBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  updateEvent(req: Request, res: Response, next: NextFunction): Promise<void>;
  registerEvent(req: Request, res: Response, next: NextFunction): Promise<void>;
}
