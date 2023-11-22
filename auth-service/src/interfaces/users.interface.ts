export interface User {
  _id: string;
  name: string;
  username: string;
}

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
}
