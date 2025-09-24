import { Types } from "mongoose";
import { FoodType, IEvent } from "./events.types";
import { IUser } from "./user.types";

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
  attendanceMarked: { type: Boolean; default: false };
  foodServed:{
    breakfast?: IFoodServed;
    lunch?: IFoodServed;
    dinner?: IFoodServed;
    drinks?: IFoodServed;
  }
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicketCreate
  extends Omit<ITicket, "_id" | "createdAt" | "updatedAt" | "foodServed" | "attendanceMarked"> {}
export interface ITickerUpdate extends Partial<ITicketCreate> {}

export interface ITicketResponse extends ITicket {}