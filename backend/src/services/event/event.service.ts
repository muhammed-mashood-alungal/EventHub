import { StatusCodes } from "http-status-codes";
import { IEventRepository, IUserRepository } from "../../repositories";
import {
  IEventCreate,
  IEventFilterOptions,
  IEventRegistration,
  IEventResponse,
  IEventStats,
  IPagination,
  ITicketResponse,
} from "../../types";
import {
  createHttpsError,
  generateSlug,
  paginate,
  sendEventRegistrationEmail,
} from "../../utils";
import { IEventService } from "./event.interface.service";
import { ERROR } from "../../constants";
import { mapUserEventResponse } from "../../mappers/event.mapper";
import { ITicketService } from "../ticket/ticket.interface.service";
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

  async getMyEvents(
    options: IEventFilterOptions,
    organizerId: string
  ): Promise<IPagination<IEventResponse>> {
    const { events, total } = await this._eventRepository.getMyEvents(
      options,
      organizerId
    );
    console.log(events);
    const mappedEvents = events.map((x) => mapUserEventResponse(x));
    const paginatedData = paginate(
      total,
      options.page,
      options.limit,
      mappedEvents
    );
    return paginatedData;
  }

  async getAllEvents(
    options: IEventFilterOptions
  ): Promise<IPagination<IEventResponse>> {
    const { events, total } = await this._eventRepository.getAllEvents(options);
    const mappedEvents = events.map((x) => mapUserEventResponse(x));
    const paginatedData = paginate(
      total,
      options.page,
      options.limit,
      mappedEvents
    );
    return paginatedData;
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
    const registered = await this._ticketService.isUserRegistered(
      event?._id,
      userId
    );

    console.log(registered)
    return mapUserEventResponse(event, registered);
  }

  async updateEvent(
    eventId: unknown,
    event: IEventCreate
  ): Promise<IEventResponse | null> {
    const updatedData = await this._eventRepository.updateEvent(
      eventId as string,
      event
    );
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
    const event = await this._eventRepository.validateEventForRegistration(registrationData);

    const generatedTicket = await this._ticketService.generateTicket(
      registrationData.eventId.toString(),
      registrationData.userId.toString()
    );

    const user = await this._userRepository.findUserById(
      registrationData.userId as string
    );

    await this._eventRepository.increaseRegisterCount(event.id as string)
    
    await sendEventRegistrationEmail(
      user?.email!,
      event.title,
      generatedTicket.qrCode as string,
      generatedTicket.uniqueCode as string
    );
    return mapTicket(generatedTicket);
  }
}
