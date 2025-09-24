import { StatusCodes } from "http-status-codes";
import { IEventRepository, IUserRepository } from "../../repositories";
import {
  IEventCreate,
  IEventFilterOptions,
  IEventRegistration,
  IEventResponse,
  ITicketResponse,
} from "../../types";
import {
  createHttpsError,
  generateSlug,
  sendEventRegistrationEmail,
} from "../../utils";
import { IEventService } from "./event.interface.service";
import { ERROR } from "../../constants";
import { sl } from "zod/v4/locales";
import { mapUserEventResponse } from "../../mappers/event.mapper";
import { ITicketService } from "../ticket/ticket.interface.service";
import { ITicketModel } from "../../models";
import { mapTicket } from "../../mappers";

export class EventService implements IEventService {
  constructor(
    private _eventRepository: IEventRepository,
    private _userRepository: IUserRepository,
    private _ticketService: ITicketService
  ) {}
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
  ): Promise<ITicketResponse> {
    const event = await this._eventRepository.registerEvent(registrationData);
    const generatedTicket = await this._ticketService.generateTicket(
      registrationData.eventId.toString(),
      registrationData.userId.toString()
    );
    const user = await this._userRepository.findUserById(
      registrationData.userId as string
    );
    await sendEventRegistrationEmail(
      user?.email!,
      event.title,
      generatedTicket.qrCode as string,
      generatedTicket.uniqueCode as string
    );
    return mapTicket(generatedTicket);
  }
}
