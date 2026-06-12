import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import mongoose, { Document } from 'mongoose';
import { success, z, type ZodObject, type ZodRawShape } from 'zod';
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken';

type AuthUser = JwtPayload & {
  id: string;
};

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

const SECRET_KEY = process.env.JWT_SECRET;

const app = express();

app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(`Connection error; ${err}`);
    process.exit(1);
  }
}

connectDB();

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>('User', UserSchema);

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

function validate<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: result.error.issues,
      });
    }

    req.body = result.data;
    next();
  };
}

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

      const hashedPassword = await bcrypt.hash(plainPassword, 10);

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
      res.status(500).json({
        success: false,
        message: 'internal server error',
      });
    }
  }
);

app.post('/login', async (req, res) => {
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

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1d' });

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
});

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token not provided',
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as AuthUser;
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'invalid token',
    });
  }
};

app.get('/profile', authMiddleware, async (req, res) => {
  const decoded = req.user as AuthUser;
  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
