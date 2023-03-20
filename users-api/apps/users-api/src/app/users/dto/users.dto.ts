import { usersModelsI } from '@users-api/definitions';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class editUserDto implements Partial<usersModelsI> {
  @ApiProperty({
    type: String,
    example: 'pedro',
    description: 'This is a required property',
  })
  name: string;
  @ApiProperty({
    type: String,
    example: 'gonzalez',
    description: 'This is a required property',
  })
  last_name: string;

  @ApiProperty({
    type: String,
    example: '+2645551111',
    description: 'This is an required property',
  })
  phone_number: string;

  @ApiProperty({
    type: String,
    example: 'calle ejemplo oeste',
    description: 'This is an required property',
  })
  street_addres: string;

  @ApiProperty({
    type: String,
    example: '153',
    description: 'This is an required property',
  })
  street_number: string;

  @ApiProperty({
    type: Number,
    description: 'This is an required property',
  })
  city_id: number;
  @ApiProperty({
    type: Number,
    description: 'This is an required property',
  })
  state_id: number;
}

export class getUserInfoDto {
  @ApiProperty({
    description: 'users id',
  })
  @IsNotEmpty()
  user_id: string;
}
