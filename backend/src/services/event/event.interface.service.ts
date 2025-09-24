import {
  IEventCreate,
  IEventFilterOptions,
  IEventRegistration,
  IEventResponse,
  ITicketResponse,
} from "../../types";

export interface IEventService {
  createEvent(
    eventData: IEventCreate,
    organizerId: string
  ): Promise<IEventResponse>;
  getAllEvents(options: IEventFilterOptions): Promise<IEventResponse[]>;
  getMyEvents(organizerId: string): Promise<IEventResponse[]>;
  getEventBySlug(slug: string, userId: string): Promise<IEventResponse | null>;
  updateEvent(
    eventId: string,
    event: IEventCreate
  ): Promise<IEventResponse | null>;
  registerEvent(
      registrationData: IEventRegistration
    ): Promise<ITicketResponse>
}
