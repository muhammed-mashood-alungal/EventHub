import type { IPaginationFilters } from "./common.types";
import type { Event } from "./events.types";
import type { IUser } from "./user.types";

export type FoodType = "breakfast" | "lunch" | "dinner" | "drinks";

export interface IFoodServed {
  served: boolean;
  servedAt?: Date;
}

export type FoodServed = {
  [K in FoodType]?: IFoodServed;
};

export interface ITicket {
  id: string;
  event: Event;
  attendee: IUser;
  qrCode: String;
  uniqueCode: String;
  attendanceMarked: { type: Boolean; default: false };
  foodServed: {
    breakfast?: IFoodServed;
    lunch?: IFoodServed;
    dinner?: IFoodServed;
    drinks?: IFoodServed;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventStats {
  totalRegistrations: number;
  participated: number;
  food: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
}

export interface ITicketFilterOptions extends IPaginationFilters {
  uniqueCode: string;
  status: "upcoming" | "past" | "ongoing";
}
