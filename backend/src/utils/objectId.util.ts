import mongoose, { Types } from "mongoose";

export const toObjectId = (id: string | Types.ObjectId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId");
  }
  return new mongoose.Types.ObjectId(id);
};
