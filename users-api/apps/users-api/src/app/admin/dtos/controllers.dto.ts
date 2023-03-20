import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetSingleUserDto {
  @ApiProperty({
    example: '9e26149b-076a-43d2-a5bb-bf1c2dc2bdd3',
    description: 'get single user',
  })
  @IsNotEmpty()
  id: string;
}

export class GetAlluserQuerysDto {
  @ApiPropertyOptional({
    example: '',
    description: 'Get all users by role, 1=admin, 2=user',
  })
  role: string;
  @ApiPropertyOptional({
    description: 'Get all users by name',
  })
  user_name: string;

  @ApiPropertyOptional({
    description: 'current page',
  })
  page: number;
}
