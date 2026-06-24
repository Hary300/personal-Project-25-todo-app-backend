import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { userSchema } from '../validators/user.validator.js';
import { login, register } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', validate(userSchema), register);

router.post('/login', login);

export default router;
