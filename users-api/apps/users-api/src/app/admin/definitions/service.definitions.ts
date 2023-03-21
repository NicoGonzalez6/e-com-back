import { usersModelsI } from '@users-api/definitions';

export interface getAllUserI {
  total_users: number;
  current_page: number;
  users: usersModelsI[] | [];
  total_pages: number;
}

export interface getUsersCountI {
  total_users: number;
}
