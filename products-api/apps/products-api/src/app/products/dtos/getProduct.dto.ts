import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetProductDto {
  @ApiProperty({
    description: 'Product Id',
  })
  id: number;
}

export class GetAllProducts {
  @ApiPropertyOptional({
    description: 'Search by name',
  })
  product_name: string;
  @ApiPropertyOptional({
    description: 'Category id',
  })
  category_id: string;
  @ApiPropertyOptional({
    description: 'Subcategory_id id',
  })
  subcategory_id: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'current page',
  })
  current_page: string;
  @ApiPropertyOptional({
    description: 'user id',
  })
  user_id: string;
  @ApiPropertyOptional({
    description: 'orderBy date ASC or DESC',
  })
  order_by: string;
}
