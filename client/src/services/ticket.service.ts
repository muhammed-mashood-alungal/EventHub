import { AxiosError } from "axios";
import { ticketInstance } from "../api/api.instances";
import type { ITicket, ITicketFilterOptions } from "../types/ticket.types";
import type { IPaginationedResponse } from "../types/common.types";

export const TicketService = {
  async getMyEventTickets(
  ): Promise<IPaginationedResponse<ITicket>> {
    try {
      const response = await ticketInstance.get("/my");
      console.log(response.data)
      return response.data.tickets;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(
        err.response?.data?.message || "Failed to fetch my tickets"
      );
    }
  },

  async getEventTickets(
    eventId: string,
    options?: ITicketFilterOptions
  ): Promise<IPaginationedResponse<ITicket>> {
    try {
      const response = await ticketInstance.get(`/event/${eventId}`, {
        params: options,
      });
      return response.data.tickets;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(
        err.response?.data?.message || "Failed to fetch event tickets"
      );
    }
  },

  async validateTicket(qrData: string, actionType: string , eventId : string): Promise<any> {
    try {
      console.log(qrData, actionType);
      const response = await ticketInstance.post(`validate/${eventId}`, {
        qrData,
        actionType,
      });
      console.log(response.data);
      return response.data.validationResult;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(
        err.response?.data?.message || "Failed to validate ticket"
      );
    }
  },
  async getRegistraionStats(eventId: string): Promise<any> {
    try {
      const response = await ticketInstance.get(`/stats/${eventId}`);
      return response.data.stats;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message || "Failed to Fetch Stats");
    }
  },
};
