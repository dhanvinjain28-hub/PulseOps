import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '@coopserve/types';
import { config } from '../config/index.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    societyId?: string;
    federationId?: string;
  };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Missing or malformed Authorization header',
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token as string, config.jwtSecret) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      timestamp: new Date().toISOString(),
    });
  }
}

export function authorize(allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient privileges for this action',
        timestamp: new Date().toISOString(),
      });
      return;
    }
    next();
  };
}
