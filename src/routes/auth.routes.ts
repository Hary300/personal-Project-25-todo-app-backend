import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { userSchema } from '../validators/user.validator.js';
import { authMiddleware } from '../middlewares/auth.js';
import { login, register } from '../controllers/auth.controller.js';
import { profile } from '../controllers/user.controller.js';

const router = Router();

// router.get('/', (req, res) => {
//   res.json({ ok: true });
// });

router.post('/register', validate(userSchema), register);

router.post('/login', login);

router.get('/profile', authMiddleware, profile);

export default router;
