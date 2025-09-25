import { StatusCodes } from "http-status-codes";
import { mapTicket } from "../../mappers";
import { TicketRepository } from "../../repositories";
import {
  FoodType,
  IPagination,
  ITicketFilterOptions,
  ITicketResponse,
} from "../../types";
import {
  createHttpsError,
  generateTicketQR,
  generateUniqueCode,
  paginate,
} from "../../utils";
import { ITicketService } from "./ticket.interface.service";
import { ERROR, SUCCESS } from "../../constants";

export class TicketService implements ITicketService {
  constructor(private _ticketRepository: TicketRepository) {}

  async generateTicket(
    eventId: string,
    attendeeId: string
  ): Promise<ITicketResponse> {
    const existingTicket =
      await this._ticketRepository.getTicketByEventAndAttendee(
        eventId,
        attendeeId
      );
    if (existingTicket) {
      throw createHttpsError(
        StatusCodes.BAD_REQUEST,
        ERROR.TICKET.ALREADY_REGISTERED
      );
    }
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

  async validateTicket(
    qrData: string,
    actionType: string
  ): Promise<{ success: boolean; message: string }> {
    let parsed;
    try {
      parsed = JSON.parse(qrData);
    } catch {
      return { success: false, message: ERROR.TICKET.INVALID_QR };
    }

    const { uniqueCode } = parsed;
    const ticket = await this._ticketRepository.findOne({ uniqueCode });
    if (!ticket)
      return { success: false, message: ERROR.TICKET.INVALID_TICKET };

    const [action, foodType] = actionType.split("-");

    if (action === "attendance") {
      await this._ticketRepository.markAttendance(uniqueCode);
      return { success: true, message: SUCCESS.EVENT.ATTENDANCE_MARKED };
    } else if (action === "food" && foodType) {
      await this._ticketRepository.serveFood(uniqueCode, foodType as FoodType);
      return { success: true, message: SUCCESS.EVENT.FOOD_SERVED(foodType) };
    }

    return { success: false, message: ERROR.TICKET.INVALID_TICKET };
  }

  async isUserRegistered(eventId: string, userId: string): Promise<boolean> {
    const ticket = await this._ticketRepository.getTicketByEventAndAttendee(
      eventId,
      userId
    );
    return !!ticket;
  }
}
