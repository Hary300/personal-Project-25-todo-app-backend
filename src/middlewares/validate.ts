import type { NextFunction, Request, Response } from 'express';
import type { ZodObject, ZodRawShape } from 'zod';

export function validate<T extends ZodRawShape>(schema: ZodObject<T>) {
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
