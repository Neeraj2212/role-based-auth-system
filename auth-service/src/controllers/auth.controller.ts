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

  public updateUserRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { roles } = req.body;
      const updatedUser = await this.authService.updateUserRoles(userId, roles);

      res.status(200).json({ data: updatedUser, message: 'roles updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateRolePermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role, permissions } = req.body;
      const updatedRole = await this.authService.updateRolePermissions(role, permissions);

      res.status(200).json({ data: updatedRole, message: 'permissions updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
