import { mapTicket } from "../../mappers";
import { TicketRepository } from "../../repositories";
import {
  FoodType,
  IPagination,
  ITicketFilterOptions,
  ITicketResponse,
} from "../../types";
import { generateTicketQR, generateUniqueCode, paginate } from "../../utils";
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
    const newTicket = await this._ticketRepository.createTicket(ticketData);
    return mapTicket(newTicket);
  }

  async getEventTickets(
    options: ITicketFilterOptions,
    eventId: string
  ): Promise<IPagination<ITicketResponse>> {
    const { tickets, total } = await this._ticketRepository.getEventTickets(
      options,
      eventId
    );
    const mappedTickets = tickets.map(mapTicket) as ITicketResponse[];
    const paginatedData = paginate(
      total,
      options.page,
      options.limit,
      mappedTickets
    );
    return paginatedData;
  }

  async getMyEventTickets(
    options: ITicketFilterOptions,
    userId: string
  ): Promise<IPagination<ITicketResponse>> {
    const { tickets, total } = await this._ticketRepository.getMyEventTickets(
      options,
      userId
    );
    const mappedTickets = tickets.map(mapTicket) as ITicketResponse[];
    const paginatedData = paginate(
      total,
      options.page,
      options.limit,
      mappedTickets
    );
    return paginatedData;
  }

  async markAttendance(uniqueCode: string): Promise<ITicketResponse | null> {
    const ticket = await this._ticketRepository.markAttendance(uniqueCode);
    return mapTicket(ticket);
  }
  async serveFood(
    uniqueCode: string,
    foodType: FoodType
  ): Promise<ITicketResponse | null> {
    const ticket = await this._ticketRepository.serveFood(uniqueCode, foodType);
    return mapTicket(ticket) as ITicketResponse | null;
  }

  async validateTicket(qrData: string, actionType: string): Promise<boolean> {
    const { uniqueCode } = JSON.parse(qrData);

    const ticket = await this._ticketRepository.findOne({ uniqueCode });
    if (!ticket) return false;

    const action = actionType.split("-")[0];
    if (action == "attendance") {
      await this._ticketRepository.markAttendance(uniqueCode);
    } else if (action == "food") {
      await this._ticketRepository.serveFood(
        uniqueCode,
        actionType.split("-")[1] as FoodType
      );
      return false;
    }
    return true;
  }
}
