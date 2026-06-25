import mongoose from 'mongoose';
import type { ITodo } from '../models/Todo.js';

export const TodoSchema = new mongoose.Schema<ITodo>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    task: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
