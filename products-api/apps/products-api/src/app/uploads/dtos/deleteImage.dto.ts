import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteImageDto {
  @ApiProperty({
    description: 'new category name',
  })
  @IsNotEmpty()
  keyName: string;
  @ApiProperty({
    description: 'Product Id',
  })
  @IsNotEmpty()
  product_id: number;
}
