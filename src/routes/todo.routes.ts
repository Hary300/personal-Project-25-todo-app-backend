import { Router } from 'express';
import {
  CreateNewTodo,
  DeleteTodo,
  GetCompletedTodos,
  GetPriorityFilteredTodos,
  GetTodayTodos,
  GetUpcomingTodos,
  SearchTodo,
  ToggleTodo,
  UpdateTodo,
} from '../controllers/todo.controller.js';
import { todoSchema } from '../validators/todo.validator.js';
import { validate } from '../middlewares/validate.js';

const router = Router();
// POST
router.post('/todos', validate(todoSchema), CreateNewTodo);

// GET
router.get('/todos/today', GetTodayTodos);
router.get('/todos/upcoming', GetUpcomingTodos);
router.get('/todos/completed', GetCompletedTodos);
router.get('/todos/search', SearchTodo);
router.get('/todos/priority', GetPriorityFilteredTodos);

// PATCH
router.patch('/todos/:id', UpdateTodo);
router.patch('/todos/:id/toggle', ToggleTodo);

// DELETE
router.delete('/todos/:id', DeleteTodo);
export default router;
