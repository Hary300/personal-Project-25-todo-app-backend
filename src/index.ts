import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import { connectDB } from './config/database.js';
import { User } from './models/User.js';
import { userSchema } from './validators/user.validator.js';
import { validate } from './middlewares/validate.js';
import type { AuthUser } from './types/authUser.js';
import { authMiddleware } from './middlewares/auth.js';
import { env } from './config/env.js';
import { hashPassword } from './helpers/hashPassword.js';
import { generateToken } from './helpers/generateToken.js';

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.post(
  '/register',
  validate(userSchema),
  async (req: Request, res: Response) => {
    try {
      const { username, email, password: plainPassword } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: 'Email already registered',
        });
      }

      const hashedPassword = await hashPassword(plainPassword);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      const { password, ...safeDataUser } = newUser.toObject();

      return res.status(201).json({
        success: true,
        message: 'new user created',
        data: safeDataUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'internal server error',
      });
    }
  }
);

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Password invalid',
      });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'Login successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
});

app.get('/profile', authMiddleware, async (req, res) => {
  try {
    const decoded = req.user as AuthUser;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
