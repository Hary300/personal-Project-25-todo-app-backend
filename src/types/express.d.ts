import type { JwtPayload } from 'jsonwebtoken';
import type { AuthUser } from './authUser.ts';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
