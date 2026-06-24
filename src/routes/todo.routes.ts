import { Router } from 'express';
import {
  CreateNewTodo,
  DeleteTodo,
  GetCompletedTodos,
  GetTodayTodos,
  GetUpcomingTodos,
} from '../controllers/todo.controller.js';
import { todoSchema } from '../validators/todo.validator.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.post('/todos', validate(todoSchema), CreateNewTodo);

router.get('/todos/today', GetTodayTodos);
router.get('/todos/upcoming', GetUpcomingTodos);
router.get('/todos/completed', GetCompletedTodos);

router.delete('/todos/:id', DeleteTodo);
export default router;
