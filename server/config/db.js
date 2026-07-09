import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing');
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    if (process.env.VERCEL === '1') throw error;
    process.exit(1);
  }
};

export default connectDB;
