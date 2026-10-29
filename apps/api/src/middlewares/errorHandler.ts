import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@coopserve/types';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('[API Error]:', err);

  const statusCode = err.status || err.statusCode || 500;
  const response: ApiResponse = {
    success: false,
    message: err.message || 'Internal Server Error',
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'An unexpected error occurred',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
}
