import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUsersDto } from '../dtos/users.dtos';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUsersDto, metadata: ArgumentMetadata) {
    const {
      email,
      last_name,
      name,
      password,
      phone_number,
      street_addres,
      street_number,
      state_id,
      city_id,
    } = value;

    const newValues = {
      email: email.toLocaleLowerCase(),
      last_name: last_name.toLocaleLowerCase(),
      name: name.toLocaleLowerCase(),
      password: password,
      phone_number: `+${phone_number}`,
      street_addres: street_addres.toLocaleLowerCase(),
      street_number,
      state_id,
      city_id,
    };
    return { ...newValues };
  }
}
