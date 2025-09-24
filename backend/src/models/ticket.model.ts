import { Document, model, Schema, Types } from "mongoose";
import { ITicket } from "../types";

export interface ITicketModel
  extends Document<Types.ObjectId>,
    Omit<ITicket, "_id"> {}

const foodServedSchema = new Schema(
  {
    served: { type: Boolean, default: false },
    servedAt: { type: Date },
  },
  { _id: false }
);

const ticketSchema = new Schema<ITicketModel>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    attendeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
    uniqueCode: {
      type: String,
      required: true,
    },
    attendanceMarked: {
      type: Boolean,
      default: false,
    },
    foodServed: {
      breakfast: { type: foodServedSchema },
      lunch: { type: foodServedSchema },
      dinner: { type: foodServedSchema },
      drinks: { type: foodServedSchema },
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket = model<ITicketModel>("Ticket", ticketSchema);
