import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on('connected', () => console.log('MongoDB connected Successfully!!'));
    connection.on('error', (err) => {
      console.error('Something error in DB ', err);
      process.exit();
    });
  } catch (error) {
    console.error("Something Went Wrong !! ", error);
  }
};