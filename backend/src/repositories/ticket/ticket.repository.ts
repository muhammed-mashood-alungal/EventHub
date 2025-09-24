import { StatusCodes } from "http-status-codes";
import { ITicketModel, IUserModel, Ticket } from "../../models";
import { FoodType, ITicketCreate } from "../../types";
import { createHttpsError } from "../../utils";
import { BaseRepository } from "../base.repository";
import { ITicketRepository } from "./ticket.interface.repository";
import { ERROR } from "../../constants";

export class TicketRepository
  extends BaseRepository<ITicketModel>
  implements ITicketRepository
{
  constructor() {
    super(Ticket);
  }

  async createTicket(ticket: ITicketCreate): Promise<ITicketModel> {
    const newTicket = await new Ticket(ticket);
    return await newTicket.save();
  }

  async getEventTickets(eventId: string): Promise<ITicketModel[]> {
    return this.find({ eventId });
  }

  async getMyEventTickets(userId: string): Promise<ITicketModel[]> {
    return this.find({ userId });
  }

  async markAttendance(uniqueCode: string): Promise<ITicketModel | null> {
    const ticket = await this.findOne({ uniqueCode });
    if (!ticket) {
      throw createHttpsError(StatusCodes.NOT_FOUND, ERROR.TICKET.NOT_FOUND);
    }

    if (ticket.attendanceMarked) {
      throw createHttpsError(
        StatusCodes.BAD_REQUEST,
        ERROR.TICKET.ATTENDENCE_ALREADY_MARKED
      );
    }
    return ticket;
  }

  async serveFood(
    uniqueCode: string,
    foodType: FoodType
  ): Promise<ITicketModel> {
    const ticket = await this.findOne({ uniqueCode });

    if (!ticket) {
      throw createHttpsError(StatusCodes.NOT_FOUND, ERROR.TICKET.NOT_FOUND);
    }

    const foodItem = ticket.foodServed[foodType];

    if (foodItem?.served) {
      throw createHttpsError(
        StatusCodes.BAD_REQUEST,
        ERROR.TICKET.FOOD_SERVED_ALREADY(foodType)
      );
    }

    ticket.foodServed[foodType] = {
      served: true,
      servedAt: new Date(),
    };

    await ticket.save();

    return ticket;
  }
}
