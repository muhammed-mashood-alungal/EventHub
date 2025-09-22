import { Document, model, Schema, Types } from "mongoose";
import { IUser } from "../types/user.types";

export interface IUserModel
  extends Document<Types.ObjectId>,
    Omit<IUser, "_id"> {}

const userSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "organizer"],
    },
    phone: {
      type: String,
      required: true,
    },
    organization: {
      name: { type: String,  },
      address: { type: String, },
      website: { type: String },
    },
  },
  {
    timestamps: true,
  }
);
export const User = model<IUserModel>("User", userSchema);
;
