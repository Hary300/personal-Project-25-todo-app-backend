import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { userSchema } from '../validators/user.validator.js';
import { login, register } from '../controllers/auth.controller.js';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *    post:
 *      tags:
 *        - Auth
 *      summary: Register
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - email
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                  example: user
 *                email:
 *                  type: string
 *                  example: user@example.com
 *                password:
 *                  type: string
 *                  example: password123
 *      responses:
 *        200:
 *          description: Success
 */

router.post('/register', validate(userSchema), register);

/**
 * @swagger
 * /auth/login:
 *    post:
 *      tags:
 *        - Auth
 *      summary: Login
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  example: user@example.com
 *                password:
 *                  type: string
 *                  example: password123
 *      responses:
 *        200:
 *          description: Success
 */

router.post('/login', login);

export default router;
