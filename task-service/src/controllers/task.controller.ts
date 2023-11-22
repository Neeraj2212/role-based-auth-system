import { Request, Response, NextFunction } from 'express';

export class TaskController {
  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    return { message: 'Task fetched successfully' };
  };

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    return { message: 'Task created successfully' };
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    return { message: 'Task updated successfully' };
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    return { message: 'Task deleted successfully' };
  };
}
