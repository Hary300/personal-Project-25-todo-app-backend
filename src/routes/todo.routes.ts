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
// CREATE (POST)
router.post('/todos', validate(todoSchema), CreateNewTodo);

// READ (GET)
router.get('/todos/today', GetTodayTodos);
router.get('/todos/upcoming', GetUpcomingTodos);
router.get('/todos/completed', GetCompletedTodos);
router.get('/todos/priority', GetPriorityFilteredTodos);
router.get('/todos/search', SearchTodo);

// UPDATE (PATCH)
router.patch('/todos/:id', UpdateTodo);
router.patch('/todos/:id/toggle', ToggleTodo);

// DELETE (DELETE)
router.delete('/todos/:id', DeleteTodo);
export default router;
