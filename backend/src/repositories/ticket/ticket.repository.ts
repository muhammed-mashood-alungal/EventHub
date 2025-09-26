import { StatusCodes } from "http-status-codes";
import { ITicketModel, Ticket } from "../../models";
import {
  FoodType,
  IEventStats,
  ITicketCreate,
  ITicketFilterOptions,
} from "../../types";
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
    return (await this.model.create(ticket)).populate('attendeeId eventId');
  }

  async getEventTickets(
    options: ITicketFilterOptions,
    eventId: string
  ): Promise<{ tickets: ITicketModel[]; total: number }> {
    const tickets = await this.paginate(
      { eventId },
      options.page,
      options.limit,
      [{ path: "attendeeId" }, { path: "eventId" }]
    );
    const total = await this.model.countDocuments({ eventId });
    return { tickets, total };
  }

  async getMyEventTickets(
    options: ITicketFilterOptions,
    userId: string
  ): Promise<{ tickets: ITicketModel[]; total: number }> {
    const tickets = await this.paginate(
      { attendeeId: userId },
      options.page || 1,
      options.limit || 10,
      [{ path: "attendeeId" }, { path: "eventId" }]
    );

    const total = await this.model.countDocuments({ userId });
    return { tickets, total };
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
    await this.updateOne({ uniqueCode }, { $set: { attendanceMarked: true } });
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
  async getTicketByEventAndAttendee(
    eventId: string,
    attendeeId: string
  ): Promise<ITicketModel | null> {
    return await this.findOne({ eventId, attendeeId });
  }

  async getEventStats(eventId: string): Promise<IEventStats> {
    const tickets = await this.find({ eventId });

    const res: IEventStats = {
      totalRegistrations: tickets.length,
      participated: 0,
      food: {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        drinks: 0,
      },
    };

    for (let ticket of tickets) {
      if (ticket.attendanceMarked) res.participated++;

      if (ticket.foodServed) {
        for (const foodType of Object.keys(
          ticket.foodServed || {}
        ) as FoodType[]) {
          const foodDetail = ticket.foodServed[foodType];
          if (foodDetail?.served) {
            res.food[foodType]++;
          }
        }
      }
    }
    return res;
  }
}
