import { NextFunction, Request, Response } from "express";
import { ITicketController } from "./ticket.interface.controller";
import { ITicketService } from "../../services/ticket/ticket.interface.service";
import { successResponse } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ITicketFilterOptions } from "../../types";

export class TicketController implements ITicketController {
  constructor(private readonly _ticketService: ITicketService) {}

  async getEventTickets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const eventId = req.params?.eventId;
      const options: unknown = req.query;
      const tickets = await this._ticketService.getEventTickets(
        options as ITicketFilterOptions,
        eventId
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, { tickets });
    } catch (error) {
      next(error);
    }
  }

  async getMyEventTickets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id as string;
      const options: unknown = req.query;
      const tickets = await this._ticketService.getMyEventTickets(
        options as ITicketFilterOptions,
        userId
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, { tickets });
    } catch (error) {
      next(error);
    }
  }
  async validateTicket(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { qrData, actionType } = req.body;
      const { eventId } = req.params;
      const validationResult = await this._ticketService.validateTicket(
        qrData,
        actionType,
        eventId
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, {
        validationResult,
      });
    } catch (error) {
      next(error);
    }
  }

  async getEventRegistrationStats(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { eventId } = req.params;
      const stats = await this._ticketService.getEventStats(eventId as string);
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, { stats });
    } catch (error) {
      next(error);
    }
  }
}
