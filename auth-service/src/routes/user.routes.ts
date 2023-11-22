import { Router } from 'express';
import UserController from '@controllers/user.controller';
import { CreateUserDto, UpdateUserDto } from '@/dtos/user.dtos';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import { validatePermissionMiddleware } from '@/middlewares/validate.permissoin.middleware';
import { Permissions } from '@/config';

class UsersRoute implements Routes {
  public router = Router();
  public userController = new UserController();
  public path = '/user/';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}all`, this.userController.getUsers);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.userController.createUser);

    this.router.get(`${this.path}:id`, this.userController.getUserById);
    this.router.put(
      `${this.path}:id`,
      validationMiddleware(UpdateUserDto, 'body', true),
      authMiddleware,
      validatePermissionMiddleware(Permissions.UPDATE_PROFILE),
      this.userController.updateUser,
    );

    this.router.delete(`${this.path}:id`, authMiddleware, validatePermissionMiddleware(Permissions.DELETE_PROFILE), this.userController.deleteUser);
  }
}

export default UsersRoute;
