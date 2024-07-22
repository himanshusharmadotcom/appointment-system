import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Database Connected Successfully.');
  } catch (err) {
    console.error(err.message);
  }
};


export default connectDB