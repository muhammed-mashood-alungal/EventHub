import { Types } from "mongoose";
import { FoodType, IEvent, IEventResponse } from "./events.types";
import { IUser, IUserResponse } from "./user.types";
import { IPaginationFilters } from "./common.types";

export interface IFoodServed {
  served: boolean;
  servedAt?: Date;
}

export type FoodServed = {
  [K in FoodType]?: IFoodServed;
};

export interface ITicket {
  _id: string | Types.ObjectId;
  eventId: string | IEvent;
  attendeeId: string | IUser;
  qrCode: String;
  uniqueCode: String;
  attendanceMarked: boolean;
  foodServed: FoodServed;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventStats {
  totalRegistrations: number;
  participated: number;
  food: Record<FoodType, number>;
}

export interface ITicketFilterOptions extends IPaginationFilters {
  uniqueCode: string;
  status: "upcoming" | "past" | "ongoing";
}

export interface ITicketCreate
  extends Omit<
    ITicket,
    "_id" | "createdAt" | "updatedAt" | "foodServed" | "attendanceMarked"
  > {}
export interface ITickerUpdate extends Partial<ITicketCreate> {}

export interface ITicketResponse
  extends Omit<ITicket, "_id" | "attendeeId" | "eventId"> {
  id: string;
  attendee: IUserResponse;
  event: IEventResponse;
}
