import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  @ApiPropertyOptional({
    description: 'category id to be edited',
  })
  parent_category_id: number;
  @ApiPropertyOptional({
    description: 'new category name',
  })
  subcategory_name: string;
}
