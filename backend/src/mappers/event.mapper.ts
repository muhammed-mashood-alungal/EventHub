import { IEventModel, IUserModel } from "../models";
import { IEventResponse } from "../types";
import { getEventStatus } from "../utils";
import { mapUserResponse } from "./user.mapper";

export const mapUserEventResponse = (event: IEventModel): IEventResponse => {
  return {
    id: event._id.toString(),
    title: event.title,
    description: event.description,
    category: event.category,
    foodIncluded: event.foodIncluded,
    meals: event.meals,
    guests: event.guests,
    status: getEventStatus(new Date(event.startTime), new Date(event.endTime)),
    startTime: event.startTime,
    endTime: event.endTime,
    venue: event.venue,
    registeredCount: event.registeredCount,
    capacity: event.capacity,
    organizer: mapUserResponse(event.organizerId as IUserModel),
    slug: event.slug,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  };
};
