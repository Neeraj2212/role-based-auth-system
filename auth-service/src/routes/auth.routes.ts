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
    this.router.get('/auth/token/:id', this.authController.getUserToken);
  }
}

export default AuthRoutes;
