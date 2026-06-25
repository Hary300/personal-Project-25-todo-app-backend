import mongoose, { Document, Types } from 'mongoose';
import { TodoSchema } from '../schemas/todo.schema.js';

export interface ITodo extends Document {
  userId: Types.ObjectId;
  task: string;
  priority: 'low' | 'medium' | 'high';
  date: Date;
  completed: boolean;
}

export const Todo = mongoose.model<ITodo>('Todo', TodoSchema);
