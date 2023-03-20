import { ApiProperty } from '@nestjs/swagger';

export class GetStatesDto {
  @ApiProperty({
    type: Number,
    description: 'Get all the state of the city id provided',
  })
  city_id: number;
}
