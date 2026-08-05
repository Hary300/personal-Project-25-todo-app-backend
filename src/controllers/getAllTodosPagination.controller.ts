import type { Request, Response } from 'express';
import { getTodayRange } from '../helpers/getDateRange.js';
import { Todo } from '../models/Todo.js';
import { querySchema } from '../schemas/querySchema.js';
import { sendError, sendSuccess } from '../helpers/response.js';

// READ
export const GetAllTodos = async (req: Request, res: Response) => {
  try {
    const { limit, q, page, priority, view } = querySchema.parse(req.query);
    const userId = req.user!.id;
    const skip = (page - 1) * limit;

    const { start, end } = getTodayRange();

    const filter = {
      userId,
      ...(q && {
        task: {
          $regex: q,
          $options: 'i',
        },
      }),
      ...(view === 'completed' && {
        completed: true,
      }),
      ...(priority && { priority }),
      ...(view === 'today' && {
        date: {
          $gte: start,
          $lte: end,
        },
      }),
      ...(view === 'upcoming' && {
        date: {
          $gte: end,
        },
      }),
    };

    const total = await Todo.countDocuments(filter);

    const allTodos = await Todo.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };

    return sendSuccess(res, 200, 'All todos retrieved successfully', {
      todos: allTodos,
      pagination,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};
