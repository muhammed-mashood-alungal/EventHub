import { ITicketResponse } from "../types";

export const mapTicket = (ticket: any): ITicketResponse => {
  return {
    id: ticket._id.toString(),
    uniqueCode: ticket.uniqueCode,
    qrCode: ticket.qrCode,
    eventId: ticket.eventId,
    attendeeId: ticket.attendeeId,
    attendanceMarked : ticket.attendanceMarked,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    foodServed : ticket.foodServed,
  };
};
