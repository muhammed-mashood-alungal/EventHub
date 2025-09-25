import { NextFunction, Request, Response } from "express";
import { IEventService } from "../../services/event/event.interface.service";
import { IEventController } from "./event.interface.controller";
import { SUCCESS } from "../../constants";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../utils";
import { IEventFilterOptions } from "../../types";

export class EventController implements IEventController {
  constructor(private _eventService: IEventService) {}

  async createEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const eventData = req.body;
      const event = await this._eventService.createEvent(
        eventData,
        req?.user?.id as string
      );
      successResponse(res, StatusCodes.CREATED, SUCCESS.EVENT.CREATE_SUCCESS, {
        event,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const options: unknown = req.query;
      const events = await this._eventService.getAllEvents(
        options as IEventFilterOptions
      );
      successResponse(res, StatusCodes.OK, SUCCESS.COMMON.OK, {
        events,
      });
    } catch (error) {
      next(error);
    }
  }

  async getEventBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const event = await this._eventService.getEventBySlug(
        slug,
        req?.user?.id as string
      );
      successResponse(res, StatusCodes.OK, SUCCESS.COMMON.OK, {
        event,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const options: unknown = req.query;

      const events = await this._eventService.getMyEvents(
        options as IEventFilterOptions,
        req?.user?.id as string
      );
      successResponse(res, StatusCodes.OK, SUCCESS.COMMON.OK, {
        events,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const eventData = req.body;
      const { eventId } = req.params;
     
      const event = await this._eventService.updateEvent(eventId, eventData);
      successResponse(res, StatusCodes.OK, SUCCESS.EVENT.UPDATED, { event });
    } catch (error) {
      next(error);
    }
  }

  async registerEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const registrationData = req.body;
      const { eventId } = req.params;
      const ticketDetails = await this._eventService.registerEvent({
        ...registrationData,
        eventId,
      });

      successResponse(res, StatusCodes.OK, SUCCESS.EVENT.REGISTERED, {
        ticketDetails,
      });
    } catch (error) {
      next(error);
    }
  }
}
