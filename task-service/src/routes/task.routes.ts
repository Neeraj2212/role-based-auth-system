import { Permissions } from '@/config';
import { TaskController } from '@/controllers/task.controller';
import authPermissionMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class TaskRoutes implements Routes {
  public controller = new TaskController();
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/all', authPermissionMiddleware(Permissions.READ_TASK), this.controller.getTasks);
    this.router.put('/:id', authPermissionMiddleware(Permissions.UPDATE_TASK), this.controller.updateTask);
    this.router.delete('/:id', authPermissionMiddleware(Permissions.DELETE_TASK), this.controller.deleteTask);
    this.router.post('/', authPermissionMiddleware(Permissions.CREATE_TASK), this.controller.createTask);
  }
}
