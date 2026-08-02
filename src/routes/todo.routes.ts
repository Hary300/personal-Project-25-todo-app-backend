import { Router } from 'express';
import {
  CreateNewTodo,
  DeleteTodo,
  GetAllTodos,
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
router.post('/', validate(todoSchema), CreateNewTodo);

/**
 * @swagger
 * /api/todos:
 *    get:
 *      tags:
 *        - Todos
 *      summary: Get all todos
 *      responses:
 *        200:
 *          description: Success
 */

// READ (GET)
router.get('/', GetAllTodos);
router.get('/search', SearchTodo);
router.get('/today', GetTodayTodos);
router.get('/upcoming', GetUpcomingTodos);
router.get('/completed', GetCompletedTodos);
router.get('/priority', GetPriorityFilteredTodos);

// UPDATE (PATCH)
router.patch('/:id', UpdateTodo);
router.patch('/:id/toggle', ToggleTodo);

// DELETE (DELETE)
router.delete('/:id', DeleteTodo);
export default router;
