export interface User {
  _id: string;
  name: string;
  username: string;
  roles: string[];
  hasPermission(permission: string): boolean;
}
