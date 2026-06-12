import mongoose, { type Document } from 'mongoose';
import { UserSchema } from '../schemas/user.schema.js';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

export const User = mongoose.model<IUser>('User', UserSchema);
