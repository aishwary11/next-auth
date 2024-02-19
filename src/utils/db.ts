import mongoose from "mongoose";
import constant from "../common/constant";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI!);
    if (connect) console.log('Connected to MongoDB');
    else console.error("Error while connect", connect);
  } catch (error) {
    console.error("Error while connect", error);
    setTimeout(connectDB, constant.timeOutDB);
  }
};