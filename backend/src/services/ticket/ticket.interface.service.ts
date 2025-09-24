import { ITicketResponse } from "../../types";

export interface ITicketService {
  generateTicket(eventId: string, attendeeId: string): Promise<ITicketResponse>;
  validateTicket(qrData: string, actionType: string): Promise<boolean>;
  getEventTickets(eventId: string): Promise<ITicketResponse[]>;
  getMyEventTickets(userId: string): Promise<ITicketResponse[]>;
  markAttendance(uniqueCode: string): Promise<ITicketResponse | null>;
  serveFood(
    uniqueCode: string,
    foodType: string
  ): Promise<ITicketResponse | null>;
}
