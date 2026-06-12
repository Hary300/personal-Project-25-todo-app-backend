import { Router, type Request, type Response } from 'express';
import { validate } from '../middlewares/validate.js';
import { userSchema } from '../validators/user.validator.js';
import { User } from '../models/User.js';
import { sendError, sendSuccess } from '../helpers/response.js';
import { hashPassword } from '../helpers/hashPassword.js';
import { generateToken } from '../helpers/generateToken.js';
import bcrypt from 'bcrypt';
import type { AuthUser } from '../types/authUser.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post(
  '/register',
  validate(userSchema),
  async (req: Request, res: Response) => {
    try {
      const { username, email, password: plainPassword } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return sendError(res, 400, 'Email already registered');
      }

      const hashedPassword = await hashPassword(plainPassword);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      const { password, ...safeDataUser } = newUser.toObject();

      return sendSuccess(res, 201, 'New user created', safeDataUser);
    } catch (err) {
      console.error(err);
      return sendError(res, 500, 'Internal server error');
    }
  }
);

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return sendError(res, 400, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendError(res, 400, 'Password invalid');
    }

    const token = generateToken(user.id);

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    return sendSuccess(res, 201, 'Login successfully', userData);
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'internal server error');
  }
});

router.get('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    const decoded = req.user as AuthUser;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    return sendSuccess(res, 200, '"Profile retrieved successfully"', user);
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'internal server error');
  }
});

export default router;
