import type { Request, Response } from 'express';
import { Todo } from '../models/Todo.js';
import { getDateRange, getTodayRange } from '../helpers/getDateRange.js';
import { sendError, sendSuccess } from '../helpers/response.js';

// CREATE
export const CreateNewTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { task, date } = req.body;
    const { start, end } = getDateRange(date);

    const existingTodo = await Todo.findOne({
      userId,
      task: { $regex: new RegExp(`^${task}$`, 'i') },
      date: {
        $gte: start,
        $lte: end,
      },
    });

    if (!existingTodo) {
      return sendError(res, 400, 'Task already exists for this day.');
    }

    const newTodo = await Todo.create({ ...req.body, userId });

    return sendSuccess(res, 201, 'New task added successfully', newTodo);
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};

// READ
export const GetTodayTodos = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const { start, end } = getTodayRange();
    const todayTodos = await Todo.find({
      _id: userId,
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
    const userId = req.user!.id;
    const { end } = getTodayRange();
    const upcomingTodos = await Todo.find({
      _id: userId,
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
    const userId = req.user!.id;
    const completedTodos = await Todo.find({ _id: userId, completed: true });

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

export const GetPriorityFilteredTodos = async (req: Request, res: Response) => {
  try {
    const { level } = req.query;

    if (level !== 'low' && level !== 'medium' && level !== 'high') {
      return sendError(res, 400, 'Invalid priority');
    }

    const selectedPriorityTodos = await Todo.find({
      priority: level,
    });

    if (selectedPriorityTodos.length === 0) {
      return sendError(res, 404, 'Todos not found');
    }

    return sendSuccess(
      res,
      200,
      'Todo with the determined priority retrieved successfully',
      selectedPriorityTodos
    );
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};

export const SearchTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { keyword } = req.query;

    if (typeof keyword !== 'string') {
      return sendError(res, 400, 'Keyword is required');
    }

    const todos = await Todo.find({
      userId,
      task: {
        $regex: keyword,
        $options: 'i',
      },
    });

    if (todos.length === 0) {
      return sendError(res, 404, 'Todo not found');
    }

    return sendSuccess(res, 200, 'Todos retrieved successfully', todos);
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};

// UPDATE
export const UpdateTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const { task, priority, date } = req.body;

    if (!id) {
      return sendError(res, 400, 'Todo ID is required');
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      { task, priority, date },
      {
        new: true, // Return the updated document
        runValidators: true, //apply schema validation during update
      }
    );

    if (!updatedTodo) {
      return sendError(res, 404, 'Todo not found');
    }
    return sendSuccess(res, 200, 'Todo updated successfully', updatedTodo);
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};

export const ToggleTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    if (!id) {
      return sendError(res, 400, 'Todo ID is required');
    }

    const todo = await Todo.findOne({ userId, _id: id });

    if (!todo) {
      return sendError(res, 404, 'Todo not found');
    }

    const toggledTodo = await Todo.findByIdAndUpdate(
      id,
      {
        completed: !todo.completed,
      },
      { new: true }
    );

    return sendSuccess(res, 200, 'Todo toggled successfully', toggledTodo);
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};

// DELETE
export const DeleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    if (!id) {
      return sendError(res, 400, 'Todo ID is required');
    }

    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedTodo) {
      return sendError(res, 404, 'Todo not found');
    }

    return sendSuccess(res, 200, 'Todo deleted successfully');
  } catch (err) {
    console.log(err);
    return sendError(res, 500, 'Internal server error');
  }
};
