import { ITicketResponse } from "../types";
import { mapUserEventResponse } from "./event.mapper";
import { mapUserResponse } from "./user.mapper";

export const mapTicket = (ticket: any): ITicketResponse => {
  console.log(ticket.eventId)
  console.log('+++++++++++++++++++++++++++++++++++++')
  return {
    id: ticket?.id,
    uniqueCode: ticket.uniqueCode,
    qrCode: ticket.qrCode,
    event: mapUserEventResponse(ticket.eventId),
    attendee: mapUserResponse(ticket.attendeeId),
    attendanceMarked: ticket.attendanceMarked,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    foodServed: ticket.foodServed,
  };
};
