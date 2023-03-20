import { usersModelsI } from '@users-api/definitions';

export interface getAllUserI {
  total_users: number;
  current_page: number;
  users: usersModelsI[] | [];
}

export interface getUsersCountI {
  total_users: number;
}
