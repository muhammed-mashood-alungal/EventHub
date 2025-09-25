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
import { FilterQuery } from "mongoose";

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
    const events = await this.find({ organizerId });
    const total = await this.model.countDocuments(filter);
    return { events, total };
  }
  async getEventBySlug(slug: string): Promise<IEventModel | null> {
    return await this.findOne({ slug });
  }
  async updateEvent(
    eventId: string,
    event: IEventUpdate
  ): Promise<IEventModel | null> {
    return await this.findByIdAndUpdate(toObjectId(eventId), event);
  }
  async registerEvent(
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

    event.capacity++;
    return await event.save();
  }

  _generateFilter(options: IEventFilterOptions) {
    const filter: FilterQuery<IEventModel> = {};
    if (options.title) {
      filter.title = { $regex: options.title, $options: "i" };
    }
    if (options.category) {
      filter.category = options.category;
    }
    if (options.status === "upcoming") {
      filter.status = "upcoming";
      filter.startTime = { $gt: new Date() };
    } else if (options.status === "past") {
      filter.status = "past";
      filter.endTime = { $lt: new Date() };
    }
    return filter;
  }
}
