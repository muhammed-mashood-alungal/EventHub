import { Document, model, Schema, Types } from "mongoose";
import { IEvent } from "../types/events.types";

export interface IEventModel
  extends Document<Types.ObjectId>,
    Omit<IEvent, "_id"> {}

const eventSchema = new Schema<IEventModel>(
  {
    title: {
      type: String,
      required: true,
    },
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Hackathon", "Concert", "Conference", "Workshop", "Other"],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    foodIncluded: {
      type: Boolean,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    meals: {
      breakfast: { type: Boolean },
      lunch: { type: Boolean },
      dinner: { type: Boolean },
      drinks: { type: Boolean },
    },
    guests: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    capacity: {
      type: Number,
      required: true,
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
export const Event = model<IEventModel>("Event", eventSchema);
