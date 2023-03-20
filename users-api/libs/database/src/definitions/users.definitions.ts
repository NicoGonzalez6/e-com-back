export interface usersModelsI {
  id?: string;
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  street_addres: string;
  street_number: string;
  user_status?: 'enabled' | 'disabled';
  user_role_id?: number;
}

export interface usersOutputI {
  dataValues: {
    id?: string;
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    street_addres: string;
    street_number: string;
    user_status?: 'enabled' | 'disabled';
  };
}
