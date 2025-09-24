import { NextFunction, Request, Response } from "express";

export interface ITicketController {
  getEventTickets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getMyEventTickets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  validateTicket(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
