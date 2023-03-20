import { ApiProperty } from '@nestjs/swagger';

export class EditCategoryDto {
  @ApiProperty({
    description: 'category id to be edited',
  })
  id: number;
  @ApiProperty({
    description: 'new category name',
  })
  category_name: string;
}
