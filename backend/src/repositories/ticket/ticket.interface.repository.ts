import { ITicketModel } from "../../models";
import { ITicketCreate } from "../../types";

export interface ITicketRepository {
  createTicket(ticket: ITicketCreate): Promise<ITicketModel>;
  getEventTickets(eventId: string): Promise<ITicketModel[]>;
  getMyEventTickets(userId: string): Promise<ITicketModel[]>;
  markAttendance(uniqueCode: string): Promise<ITicketModel | null>;
  serveFood(uniqueCode: string, foodType: string): Promise<ITicketModel | null>;
}
