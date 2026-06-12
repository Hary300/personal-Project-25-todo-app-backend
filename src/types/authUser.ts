import type { JwtPayload } from 'jsonwebtoken';

export type AuthUser = JwtPayload & {
  id: string;
};
