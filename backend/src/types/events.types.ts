import { Types } from "mongoose";
import { IUserModel } from "../models";
import { IUserResponse } from "./user.types";
import { IPaginationFilters } from "./common.types";

export interface IEvent {
  _id: string | Types.ObjectId;
  organizerId: string | Types.ObjectId | IUserModel;
  title: string;
  description: string;
  venue: string;
  category: "Hackathon" | "Concert" | "Conference" | "Workshop" | "Other";
  startTime: string;
  endTime: string;
  slug: string;
  foodIncluded: boolean;
  meals: {
    breakfast?: boolean;
    lunch?: boolean;
    dinner?: boolean;
    drinks?: boolean;
  };
  guests: { name: string; email: string; role: string }[];
  capacity: number;
  registeredCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IEventCreate
  extends Omit<
    IEvent,
    "createdAt" | "updatedAt" | "registeredCount" 
  > {}

export interface IEventUpdate extends Partial<IEventCreate> {}

export interface IEventRegistration {
  userId: string | Types.ObjectId;
  eventId: string | Types.ObjectId;
}

export interface IEventFilterOptions extends IPaginationFilters {
  search?: Object;
  status: "upcoming" | "completed" | 'ongoing';
  category?: "Hackathon" | "Concert" | "Conference" | "Workshop" | "Other" | "All";
}

export interface IEventResponse extends Omit<IEvent, "_id" | "organizerId"> {
  id : string;
  status  : 'upcoming' | 'completed' | 'ongoing'
  organizer : IUserResponse;
  registered : boolean
}

export type FoodType = "breakfast" | "lunch" | "dinner" | "drinks";