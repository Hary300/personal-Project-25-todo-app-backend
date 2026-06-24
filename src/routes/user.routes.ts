import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { profile } from '../controllers/user.controller.js';

const router = Router();

router.get('/profile', authMiddleware, profile);

export default router;
