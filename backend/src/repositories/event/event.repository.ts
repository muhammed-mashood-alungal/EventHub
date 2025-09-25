import { StatusCodes } from "http-status-codes";
import { Event, IEventModel } from "../../models";
import {
  IEventCreate,
  IEventFilterOptions,
  IEventRegistration,
  IEventUpdate,
  IPaginationFilters,
} from "../../types";
import { createHttpsError, toObjectId } from "../../utils";
import { BaseRepository } from "../base.repository";
import { IEventRepository } from "./event.interface.respository";
import { ERROR } from "../../constants";
import { FilterQuery, Types } from "mongoose";

export class EventRepository
  extends BaseRepository<IEventModel>
  implements IEventRepository
{
  constructor() {
    super(Event);
  }

  async createEvent(event: IEventCreate): Promise<IEventModel> {
    const newEvent = new Event(event);
    return await newEvent.save();
  }
  async getAllEvents(
    options: IEventFilterOptions
  ): Promise<{ events: IEventModel[]; total: number }> {
    const filter = this._generateFilter(options);
    const events = await this.paginate(filter, options.page, options.limit, {
      path: "organizerId",
    });
    const total = await this.model.countDocuments(filter);
    return { events, total };
  }

  async getMyEvents(
    options: IEventFilterOptions,
    organizerId: string
  ): Promise<{ events: IEventModel[]; total: number }> {
    const filter = this._generateFilter(options);
    const events = await this.find({ organizerId, ...filter });
    //   { organizerId, ...filter },
    //   options.page,
    //   options.limit,
    //   {
    //     path: "organizerId",
    //   }
    // );
    const total = await this.model.countDocuments({ organizerId, ...filter });
    console.log(events, total);
    return { events, total };
  }
  async getEventBySlug(slug: string): Promise<IEventModel | null> {
    return await this.findOne({ slug });
  }
  async updateEvent(
    eventId: unknown,
    event: IEventUpdate
  ): Promise<IEventModel | null> {
    console.log(eventId);
    console.log(event);
    const eventData = await this.findByIdAndUpdate(
      eventId as Types.ObjectId,
      event
    );
    return eventData;
  }

  async validateEventForRegistration(
    registrationData: IEventRegistration
  ): Promise<IEventModel> {
    const event = await this.findOne({
      _id: toObjectId(registrationData.eventId),
    });
    if (!event) {
      throw createHttpsError(
        StatusCodes.NOT_FOUND,
        ERROR.EVENT.EVENT_NOT_FOUND
      );
    }
    if (event.registeredCount > event.capacity + 1) {
      throw createHttpsError(StatusCodes.BAD_REQUEST, ERROR.EVENT.SEAT_FILLED);
    }

    return event;
  }

  async increaseRegisterCount(eventId: string): Promise<void> {
    await this.updateOne({ eventId }, { $inc: { registeredCount: 1 } });
  }

  _generateFilter(options: IEventFilterOptions) {
    const filter: FilterQuery<IEventModel> = {};
    if (options.search) {
      filter.title = { $regex: options.search, $options: "i" };
    }
    if (options.category && options.category != "All") {
      filter.category = options.category;
    }

    const now = new Date().toISOString().slice(0, 16);
    if (options.status === "upcoming") {
      filter.startTime = { $gt: now };
    } else if (options.status === "completed") {
      filter.endTime = { $lt: now };
    } else if (options.status === "ongoing") {
      filter.startTime = { $lte: now };
      filter.endTime = { $gte: now };
    }
    return filter;
  }
}
