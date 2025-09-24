import { TicketRepository } from "../../repositories";
import { FoodType, ITicketResponse } from "../../types";
import { generateTicketQR, generateUniqueCode } from "../../utils";
import { ITicketService } from "./ticket.interface.service";

export class TicketService implements ITicketService {
  constructor(private _ticketRepository: TicketRepository) {}

  async generateTicket(
    eventId: string,
    attendeeId: string
  ): Promise<ITicketResponse> {
    const uniqueCode = generateUniqueCode();
    const ticketPayload = { uniqueCode, eventId, attendeeId };
    const qrCode = await generateTicketQR(ticketPayload);

    const ticketData = {
      ...ticketPayload,
      qrCode,
    };
    return await this._ticketRepository.createTicket(ticketData);
  }

  async getEventTickets(eventId: string): Promise<ITicketResponse[]> {
    const tickets = await this._ticketRepository.getEventTickets(eventId);
    return tickets;
  }

  async getMyEventTickets(userId: string): Promise<ITicketResponse[]> {
    const tickets = await this._ticketRepository.getMyEventTickets(userId);
    return tickets;
  }

  async markAttendance(uniqueCode: string): Promise<ITicketResponse | null> {
    const ticket = await this._ticketRepository.markAttendance(uniqueCode);
    return ticket;
  }
  async serveFood(
    uniqueCode: string,
    foodType: FoodType
  ): Promise<ITicketResponse | null> {
    const ticket = await this._ticketRepository.serveFood(uniqueCode, foodType);
    return ticket;
  }

  async validateTicket(uniqueCode: string): Promise<boolean> {

    /// validation logics here.
    const ticket = await this._ticketRepository.findOne({ uniqueCode });
    return !!ticket;
  }
}
