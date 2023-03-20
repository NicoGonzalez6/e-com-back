import { Request } from 'express';

export interface IUserData {
  id: string;
  jwt: any;
  role: string;
  isAdmin: boolean;
}

export interface AuthenticatedRequest extends Request {
  user: IUserData;
}
