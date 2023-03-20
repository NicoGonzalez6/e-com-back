import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { editUserDto } from '../dto';

@Injectable()
export class EditUserPipe implements PipeTransform {
  transform(value: editUserDto, metadata: ArgumentMetadata) {
    const {
      last_name,
      name,
      phone_number,
      street_addres,
      street_number,
      state_id,
      city_id,
    } = value;

    const newValues = {
      last_name: last_name.toLocaleLowerCase(),
      name: name.toLocaleLowerCase(),
      phone_number: `+${phone_number}`,
      street_addres: street_addres.toLocaleLowerCase(),
      street_number,
      state_id,
      city_id,
    };
    return { ...newValues };
  }
}
