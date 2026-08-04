import z from 'zod';

export const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  q: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  view: z.enum(['all', 'today', 'upcoming', 'completed']).default('all'),
});
