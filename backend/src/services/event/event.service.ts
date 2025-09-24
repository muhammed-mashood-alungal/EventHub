import { StatusCodes } from "http-status-codes";
import { IEventRepository } from "../../repositories";
import {
  IEventCreate,
  IEventFilterOptions,
  IEventRegistration,
  IEventResponse,
} from "../../types";
import { createHttpsError, generateSlug } from "../../utils";
import { IEventService } from "./event.interface.service";
import { ERROR } from "../../constants";
import { sl } from "zod/v4/locales";
import { mapUserEventResponse } from "../../mappers/event.mapper";

export class EventService implements IEventService {
  constructor(private _eventRepository: IEventRepository) {}
  async createEvent(
    eventData: IEventCreate,
    organizerId: string
  ): Promise<IEventResponse> {
    const slug = generateSlug(eventData.title);
    const eventExist = await this._eventRepository.getEventBySlug(slug);

    if (eventExist && eventExist._id.toString() == organizerId) {
      throw createHttpsError(StatusCodes.CONFLICT, ERROR.EVENT.EVENT_EXISTS);
    }
    const updatedEventData = {
      ...eventData,
      organizerId,
      slug,
    };
    const newEvent = await this._eventRepository.createEvent(updatedEventData);
    return mapUserEventResponse(newEvent);
  }

  async getMyEvents(organizerId: string): Promise<IEventResponse[]> {
    const events = await this._eventRepository.getMyEvents(organizerId);
    //// NEED ORGANIZER SPECIFIC EVENTS FILTERING
    return events.map((ev) => mapUserEventResponse(ev));
  }

  async getAllEvents(options: IEventFilterOptions): Promise<IEventResponse[]> {
    const events = await this._eventRepository.getAllEvents(options);
    return events.map((ev) => mapUserEventResponse(ev));
  }
  async getEventBySlug(
    slug: string,
    userId: string
  ): Promise<IEventResponse | null> {
    const event = await this._eventRepository.getEventBySlug(slug);
    if (!event) {
      throw createHttpsError(
        StatusCodes.NOT_FOUND,
        ERROR.EVENT.EVENT_NOT_FOUND
      );
    }

    if (event.organizerId.toString() == userId) {
      /// my event details attaching logic here
      return mapUserEventResponse(event);
    } else {
      return mapUserEventResponse(event);
    }
  }

  async updateEvent(
    eventId: string,
    event: IEventCreate
  ): Promise<IEventResponse | null> {
    const updatedData = await this._eventRepository.updateEvent(eventId, event);
    if (!updatedData) {
      throw createHttpsError(
        StatusCodes.NOT_FOUND,
        ERROR.EVENT.EVENT_NOT_FOUND
      );
    }
    return mapUserEventResponse(updatedData);
  }

  async registerEvent(
    registrationData: IEventRegistration
  ): Promise<IEventResponse> {
    const event = await this._eventRepository.registerEvent(registrationData);

    /// Ticket Generation logic here.....
    return mapUserEventResponse(event);
  }
}
