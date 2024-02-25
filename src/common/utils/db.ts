import mongoose from 'mongoose';
import constant from '../constant';

const connectDB = async () => {
  try {
    const mongoURL: string = process.env.MONGODB_URI || '';
    const connect = await mongoose.connect(mongoURL);
    if (connect) console.log('Connected to MongoDB');
    else console.error('Error while connect', connect);
  } catch (error) {
    console.error('Error while connect', error);
    setTimeout(connectDB, constant.timeOutDB);
  }
};

export default connectDB;
