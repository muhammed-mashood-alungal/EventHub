import {
  IEventCreate,
  IEventFilterOptions,
  IEventRegistration,
  IEventResponse,
  IEventStats,
  IPagination,
  ITicketResponse,
} from "../../types";

export interface IEventService {
  createEvent(
    eventData: IEventCreate,
    organizerId: string
  ): Promise<IEventResponse>;
  getAllEvents(
    options: IEventFilterOptions
  ): Promise<IPagination<IEventResponse>>;
  getMyEvents(
    options: IEventFilterOptions,
    organizerId: string
  ): Promise<IPagination<IEventResponse>>;
  getEventBySlug(slug: string, userId: string): Promise<IEventResponse | null>;
  updateEvent(
    eventId: string,
    event: IEventCreate
  ): Promise<IEventResponse | null>;
  registerEvent(registrationData: IEventRegistration): Promise<ITicketResponse>;
}
