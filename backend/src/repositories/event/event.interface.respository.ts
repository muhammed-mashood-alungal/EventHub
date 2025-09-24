import { IEventModel } from "../../models";
import {  IEventCreate, IEventRegistration, IEventUpdate } from "../../types/events.types";

export interface IEventRepository {
   createEvent(event: IEventCreate): Promise<IEventModel>;
   getAllEvents(options : any): Promise<IEventModel[]>;
   getMyEvents(organizerId: string): Promise<IEventModel[]>;
   getEventBySlug(slug: string): Promise<IEventModel | null>;
   updateEvent(eventId: string, event: IEventUpdate): Promise<IEventModel | null>;
   registerEvent(registrationData : IEventRegistration) : Promise<IEventModel>;
  // cancelEvent(eventId: string): Promise<boolean>;
}
