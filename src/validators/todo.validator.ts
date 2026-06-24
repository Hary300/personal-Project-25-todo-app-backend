import { z } from 'zod';

export const todoSchema = z.object({
  task: z.string().min(1),
  priority: z.enum(['low', 'medium', 'high']),
  date: z.coerce.date(),
  complete: z.boolean(),
});
