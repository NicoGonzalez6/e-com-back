import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadImageDto {
  @ApiProperty({
    description: 'Product Id',
  })
  @IsNotEmpty()
  product_id: number;
}
