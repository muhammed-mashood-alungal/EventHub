import type z from "zod";
import type { eventSchema } from "../schema/event.schema";
import type { IPaginationFilters } from "./common.types";
import type { IUser } from "./user.types";

export interface Event {
  id: string;
  organizer: IUser;
  title: string;
  description: string;
  venue: string;
  category: "Hackathon" | "Concert" | "Conference" | "Workshop" | "Other";
  status: "upcoming" | "past" | "ongoing";
  startTime: string;
  endTime: string;
  slug : string;
  foodIncluded: boolean;
  registeredCount?: number;
  meals: {
    breakfast?: boolean;
    lunch?: boolean;
    dinner?: boolean;
    drinks?: boolean;
  };
  registered : boolean;
  guests: { name: string; email: string; role: string }[];
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

export type EventFormData = z.infer<typeof eventSchema>;

export interface IEventFilterOptions extends IPaginationFilters {
  title?: Object;
  status: "upcoming" | "past";
  category?: "Hackathon" | "Concert" | "Conference" | "Workshop" | "Other";
}
export interface IEventRegistration {
  userId: string;
}
