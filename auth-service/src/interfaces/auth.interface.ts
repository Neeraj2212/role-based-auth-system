import { Request } from 'express';
import { User } from './users.interface';

export interface Role {
  role: string;
  permissions: string[];
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
}
