import { AxiosError } from "axios";
import { ticketInstance } from "../api/api.instances";
import type { ITicket, ITicketFilterOptions } from "../types/ticket.types";

export const TicketService = {
  async getMyEventTickets(options?: ITicketFilterOptions): Promise<ITicket[]> {
    try {
      const response = await ticketInstance.get("/my", { params: options });
      return response.data.tickets;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message || "Failed to fetch my tickets");
    }
  },

  async getEventTickets(eventId: string, options?: ITicketFilterOptions): Promise<ITicket[]> {
    try {
      const response = await ticketInstance.get(`/event/${eventId}`, { params: options });
      return response.data.tickets;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message || "Failed to fetch event tickets");
    }
  },

  async validateTicket(qrData: string, actionType: string): Promise<any> {
    try {
      console.log(qrData , actionType)
      const response = await ticketInstance.post("/validate", { qrData, actionType });
      console.log(response.data)
      return response.data.validationResult;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message || "Failed to validate ticket");
    }
  },
};
