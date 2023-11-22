import AuthServices from '@/services/auth.services';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  authService = new AuthServices();

  public getUserToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const tokenData = await this.authService.createToken(userId);

      res.status(200).json({ data: tokenData, message: 'token' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
