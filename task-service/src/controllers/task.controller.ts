import { Request, Response, NextFunction } from 'express';

export class TaskController {
  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: 'Task fetched successfully' });
  };

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: 'Task created successfully' });
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: 'Task updated successfully' });
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: 'Task deleted successfully' });
  };
}
