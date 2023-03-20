import { ApiPropertyOptional } from '@nestjs/swagger';

export class EditSubCategoryDto {
  @ApiPropertyOptional({
    description: 'subcategory id to be edited',
  })
  id: number;
  @ApiPropertyOptional({
    description: 'parent category id',
  })
  parent_category_id: number;
  @ApiPropertyOptional({
    description: 'new category name',
  })
  subcategory_name: string;
}
