import { Types } from "mongoose";
import {
  IEventStats,
  IPagination,
  ITicket,
  ITicketFilterOptions,
  ITicketResponse,
} from "../../types";

export interface ITicketService {
  generateTicket(eventId: string, attendeeId: string): Promise<ITicketResponse>;
  validateTicket(
    qrData: string,
    actionType: string, 
    eventId : string
  ): Promise<{ success: boolean; message: string }>;
  getEventTickets(
    options: ITicketFilterOptions,
    eventId: string
  ): Promise<IPagination<ITicketResponse>>;
  getMyEventTickets(
    options: ITicketFilterOptions,
    userId: string
  ): Promise<IPagination<ITicketResponse>>;
  markAttendance(uniqueCode: string): Promise<ITicketResponse | null>;
  serveFood(
    uniqueCode: string,
    foodType: string
  ): Promise<ITicketResponse | null>;
  isUserRegistered(
    eventId: string | Types.ObjectId,
    userId: string
  ): Promise<boolean>;
  getEventStats(eventId: string): Promise<IEventStats>;
  getTicketByEventAndAttendee(
    eventId: string,
    attendeeId: string
  ): Promise<ITicket | null>;
}
