import { IsUserAllowed } from '@/utils/util';
import { Permissions, SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUserId } from '@interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

const authPermissionMiddleware = (permission: Permissions) => async (req: RequestWithUserId, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse: JwtPayload & DataStoredInToken = (await verify(Authorization, secretKey)) as DataStoredInToken;
      if (verificationResponse.exp < Math.floor(Date.now() / 1000)) next(new HttpException(401, 'Authentication token expired'));
      const userId = verificationResponse._id;

      const allowed = await IsUserAllowed(userId, permission, next);

      if (allowed) {
        req.userId = userId;
        next();
      } else {
        next(new HttpException(403, 'You are not allowed to access this resource'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authPermissionMiddleware;
