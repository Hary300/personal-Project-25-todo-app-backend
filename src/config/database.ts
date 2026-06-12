import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB() {
  try {
    const MONGODB_URI = env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(MONGODB_URI);

    console.log('MongoDB Connected 🚀');
  } catch (err) {
    console.log(`Connection error; ${err}`);
    process.exit(1);
  }
}
