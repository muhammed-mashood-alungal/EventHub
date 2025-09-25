import { ITicketModel } from "../../models";
import { IEventStats, ITicketCreate, ITicketFilterOptions } from "../../types";

export interface ITicketRepository {
  createTicket(ticket: ITicketCreate): Promise<ITicketModel>;
  getEventTickets(
    options: ITicketFilterOptions,
    eventId: string
  ): Promise<{ tickets: ITicketModel[]; total: number }>;
  getMyEventTickets(
    options: ITicketFilterOptions,
    userId: string
  ): Promise<{ tickets: ITicketModel[]; total: number }>;
  markAttendance(uniqueCode: string): Promise<ITicketModel | null>;
  serveFood(uniqueCode: string, foodType: string): Promise<ITicketModel | null>;
  getTicketByEventAndAttendee(eventId: string, attendeeId: string): Promise<ITicketModel | null>;
  getEventStats(eventId: string) : Promise<IEventStats>
}
