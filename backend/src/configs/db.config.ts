import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL as string);
    console.log("MONGO CONNECTED");
  } catch (error) {
    console.log("Error in DB connection", error);
  }
};
