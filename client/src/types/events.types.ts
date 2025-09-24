import type z from "zod";
import type { eventSchema } from "../schema/event.schema";

export interface Event {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  venue: string;
  category: "Hackathon" | "Concert" | "Conference" | "Workshop" | "Other";
  startTime: string;
  endTime: string;
  isPublic: boolean;
  foodIncluded: boolean;
  meals: {
    breakfast?: boolean;
    lunch?: boolean;
    dinner?: boolean;
    drinks?: boolean;
  };
  guests : { name : string , email : string ,  role : string}[]
  capacity : number
  createdAt: string;
  updatedAt: string;
}

export type EventFormData = z.infer<typeof eventSchema>;
