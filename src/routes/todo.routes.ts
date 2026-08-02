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
/**
 * @swagger
 * /todos:
 *   post:
 *     tags:
 *       - Todos
 *     summary: Create new todo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *               - priority
 *               - date
 *               - complete
 *             properties:
 *               task:
 *                 type: string
 *                 example: Learn Swagger
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: medium
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-08-03T10:00:00.000Z"
 *               complete:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/', validate(todoSchema), CreateNewTodo);

// READ (GET)
/**
 * @swagger
 * /todos:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get all todos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
router.get('/', GetAllTodos);

router.get('/search', SearchTodo);
router.get('/today', GetTodayTodos);
router.get('/upcoming', GetUpcomingTodos);
router.get('/completed', GetCompletedTodos);
router.get('/priority', GetPriorityFilteredTodos);

// UPDATE (PATCH)
/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     tags:
 *       - Todos
 *     summary: Update todo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f8a9c123456789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 example: Learn Swagger
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: high
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-08-03T10:00:00.000Z"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */
router.patch('/:id', UpdateTodo);
router.patch('/:id/toggle', ToggleTodo);

// DELETE (DELETE)
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     tags:
 *       - Todos
 *     summary: Delete todo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f8a9c123456789
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', DeleteTodo);
export default router;
