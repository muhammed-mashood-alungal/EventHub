import { AxiosError } from "axios";
import { eventInstance } from "../api/api.instances";
import type { Event, IEventRegistration } from "../types/events.types";
import type {  IPaginationedResponse } from "../types/common.types";

export const EventService = {
  async createEvent(data: Partial<Event>): Promise<Event> {
    try {
      const response = await eventInstance.post("/", data);
      return response.data.event;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message || "Failed to create event");
    }
  },

  async getAllEvents(query?: string): Promise<IPaginationedResponse<Event>> {
    try {
      const response = await eventInstance.get(`/?${query}`);
      return response.data.events;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message || "Failed to fetch events");
    }
  },

  async getEventBySlug(slug: string): Promise<Event> {
    try {
      const response = await eventInstance.get(`/${slug}`);
      return response.data.event;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message || "Failed to fetch event");
    }
  },

  async getMyEvents(query: string): Promise<IPaginationedResponse<Event>> {
    try {
      const response = await eventInstance.get(`/my/?${query}`);
      console.log(response.data.events);
      return response.data.events;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(
        err.response?.data?.message || "Failed to fetch my events"
      );
    }
  },

  async updateEvent(eventId: string, data: Partial<Event>): Promise<Event> {
    try {
      const response = await eventInstance.put(`/${eventId}`, data);
      return response.data.event;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message || "Failed to update event");
    }
  },

  async registerEvent(eventId: string, data: IEventRegistration): Promise<any> {
    try {
      const response = await eventInstance.post(`/register`, {
        ...data,
        eventId,
      });
      return response.data.ticketDetails;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(
        err.response?.data?.message || "Failed to register for event"
      );
    }
  },
};
