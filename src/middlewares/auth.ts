import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthUser } from '../types/authUser.js';
import { env } from '../config/env.js';
import { sendError } from '../helpers/response.js';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return sendError(res, 401, 'No token provided');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return sendError(res, 401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser;
    req.user = decoded;

    next();
  } catch (err) {
    return sendError(res, 401, 'Invalid token');
  }
};
