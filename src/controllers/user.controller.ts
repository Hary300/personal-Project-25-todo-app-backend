import type { Request, Response } from 'express';
import type { AuthUser } from '../types/authUser.js';
import { User } from '../models/User.js';
import { sendError, sendSuccess } from '../helpers/response.js';

export const profile = async (req: Request, res: Response) => {
  try {
    const decoded = req.user as AuthUser;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    return sendSuccess(res, 200, 'Profile retrieved successfully', user);
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'internal server error');
  }
};
