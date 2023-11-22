import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';

// To access req.user value this middleware should be followed by the authMiddleware
export const validatePermissionMiddleware = (permission: string) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const hasPermission = await user.hasPermission(permission);
    if (!hasPermission) {
      throw new HttpException(403, 'You are not allowed to access this resource');
    }
    next();
  } catch (error) {
    next(error);
  }
};
