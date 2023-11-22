import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, MONGO_URI, AUTH_SERVICE_URL } = process.env;

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
}

export enum Permissions {
  UPDATE_PROFILE = 'update:profile',
  DELETE_PROFILE = 'delete:profile',
  UPDATE_ROLES = 'update:roles',
  UPDATE_PERMISSIONS = 'update:permissions',
  CREATE_TASK = 'create:task',
  READ_TASK = 'read:task',
  UPDATE_TASK = 'update:task',
  DELETE_TASK = 'delete:task',
}
