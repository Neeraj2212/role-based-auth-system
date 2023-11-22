import { Permissions } from '@/config';
import AuthController from '@/controllers/auth.controller';
import { updatePermissionsDto, updateRolesDto, validateAccessDto } from '@/dtos/auth.dtos';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { validatePermissionMiddleware } from '@/middlewares/validate.permissoin.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class AuthRoutes implements Routes {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/token/:id', this.authController.getUserToken);
    this.router.put(
      '/roles/:userId',
      validationMiddleware(updateRolesDto, 'body'),
      authMiddleware,
      validatePermissionMiddleware(Permissions.UPDATE_ROLES),
      this.authController.updateUserRoles,
    );

    this.router.put(
      '/permissions',
      validationMiddleware(updatePermissionsDto, 'body'),
      authMiddleware,
      validatePermissionMiddleware(Permissions.UPDATE_PERMISSIONS),
      this.authController.updateRolePermissions,
    );

    this.router.post('/validate/access', validationMiddleware(validateAccessDto, 'body'), this.authController.validateAccess);
  }
}

export default AuthRoutes;
