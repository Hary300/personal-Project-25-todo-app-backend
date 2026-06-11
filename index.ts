import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { z, ZodObject, type ZodRawShape } from 'zod';
import { error } from 'node:console';

const app = express();

app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) return;
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(`Connection error; ${err}`);
  }
}

connectDB();

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

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

app.post('/user', validate(userSchema), async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'new user created',
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
