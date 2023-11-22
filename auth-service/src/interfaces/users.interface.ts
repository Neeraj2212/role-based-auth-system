export interface User {
  _id: string;
  name: string;
  username: string;
  roles: string[];
  hasPermission(permission: string): boolean;
}

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
}
