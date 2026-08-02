import express from 'express';
import cors from 'cors';

import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';
import { env } from './config/env.js';
import { authMiddleware } from './middlewares/auth.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ ok: true, greeting: 'Welcome to Hary300 dataBase' });
});

app.use('/api/auth', authRoutes);

app.use('/api/todos', authMiddleware, todoRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
