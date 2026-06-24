import type { Request, Response } from 'express';
import { Todo } from '../models/Todo.js';
import { getDateRange, getTodayRange } from '../helpers/getDateRange.js';
import { sendError, sendSuccess } from '../helpers/response.js';

export const GetTodayTodos = async (req: Request, res: Response) => {
  try {
    const { start, end } = getTodayRange();
    const todayTodos = await Todo.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });

    return sendSuccess(
      res,
      200,
      'Today todos retrieved successfully',
      todayTodos
    );
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};

export const GetUpcomingTodos = async (req: Request, res: Response) => {
  try {
    const { end } = getTodayRange();
    const upcomingTodos = await Todo.find({
      date: {
        $gte: end,
      },
    });

    return sendSuccess(
      res,
      200,
      'Upcoming todos retrieved successfully',
      upcomingTodos
    );
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};

export const GetCompletedTodos = async (req: Request, res: Response) => {
  try {
    const completedTodos = await Todo.find({ completed: true });

    return sendSuccess(
      res,
      200,
      'Completed todos retrieved successfully',
      completedTodos
    );
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};

export const DeleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return sendError(res, 404, 'Todo not found');
    }

    return sendSuccess(res, 200, 'Todo deleted successfully');
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};

// export const EditTodo = async (req: Request, res: Response) => {};

// export const ToggleTodo = async (req: Request, res: Response) => {};

// export const SearchTodo = async (req: Request, res: Response) => {};

// export const GetPriorityFilteredTodos = async (req: Request, res: Response) => {};

export const CreateNewTodo = async (req: Request, res: Response) => {
  try {
    const { task, date } = req.body;
    const { start, end } = getDateRange(date);

    const existingTodo = await Todo.findOne({
      task: { $regex: new RegExp(`^${task}$`, 'i') },
      date: {
        $gte: start,
        $lte: end,
      },
    });

    if (!existingTodo) {
      return sendError(res, 400, 'Task already exists for this day.');
    }

    const newTodo = await Todo.create(req.body);

    return sendSuccess(res, 201, 'New task added successfully', newTodo);
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};
