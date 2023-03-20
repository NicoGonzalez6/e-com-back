import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { productsI } from '@products-api/definitions';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto implements productsI {
  user_id: string;
  @ApiProperty({
    description: 'Product name',
  })
  @IsNotEmpty()
  product_name: string;

  @ApiPropertyOptional({
    description: 'Product description',
  })
  product_description: string;

  @ApiProperty({
    description: 'currency type id',
  })
  product_currency_id: number;

  @ApiPropertyOptional({
    description: 'Product price',
  })
  product_price: string;

  @ApiProperty({
    description: 'Category id',
  })
  @IsNotEmpty()
  product_category_id: number;

  @ApiProperty({
    description: 'Subcategory id',
  })
  @IsNotEmpty()
  product_subcategory_id: number;
  @ApiProperty({
    description: 'Product state, 1=new / 2=used',
  })
  @IsNotEmpty()
  product_state_id: number;
}
