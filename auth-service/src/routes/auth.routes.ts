import AuthController from '@/controllers/auth.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class AuthRoutes implements Routes {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/token/:id', this.authController.getUserToken);
    this.router.put('/token/roles/:userId', this.authController.updateUserRoles);
    this.router.put('/token/permissions', this.authController.updateRolePermissions);
  }
}

export default AuthRoutes;
