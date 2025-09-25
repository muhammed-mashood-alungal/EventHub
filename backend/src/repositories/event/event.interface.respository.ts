import { IEventModel } from "../../models";
import {
  IEventCreate,
  IEventFilterOptions,
  IEventRegistration,
  IEventUpdate,
} from "../../types";

export interface IEventRepository {
  createEvent(event: IEventCreate): Promise<IEventModel>;
  getAllEvents(options: any): Promise<{ events: IEventModel[]; total: number }>;
  getMyEvents(
    options: IEventFilterOptions,
    organizerId: string
  ): Promise<{ events: IEventModel[]; total: number }>;
  getEventBySlug(slug: string): Promise<IEventModel | null>;
  updateEvent(
    eventId: string,
    event: IEventUpdate
  ): Promise<IEventModel | null>;
  registerEvent(registrationData: IEventRegistration): Promise<IEventModel>;
  // cancelEvent(eventId: string): Promise<boolean>;
}
