import express from 'express';
import cors from 'cors';

import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import { env } from './config/env.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
