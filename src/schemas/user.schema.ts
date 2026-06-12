import mongoose from 'mongoose';
import type { IUser } from '../models/User.js';

export const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
