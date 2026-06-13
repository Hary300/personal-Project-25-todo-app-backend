import type { NextFunction, Request, Response } from 'express';
import type { ZodObject, ZodRawShape } from 'zod';
import { sendError } from '../helpers/response.js';

export function validate<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues;
      return sendError(res, 400, 'Validation failed', error);
    }

    req.body = result.data;
    next();
  };
}
