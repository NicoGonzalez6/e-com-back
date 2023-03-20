import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteImagesDto {
  @ApiProperty({
    description: 'Product Id',
  })
  @IsNotEmpty()
  product_id: number;
}
