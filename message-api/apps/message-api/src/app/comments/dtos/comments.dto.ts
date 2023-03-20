import { commentsModelI } from '@message-api/definitions';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto implements commentsModelI {
  @ApiProperty({
    description: 'product id',
  })
  product_id: number;

  @ApiProperty({
    description: 'user_id id',
  })
  user_id: string;

  @ApiProperty({
    description: 'comment have been responded',
  })
  responded: boolean;

  @ApiProperty({
    description: 'comment current state',
  })
  comment_state: 'enabled' | 'disabled';

  @ApiProperty({
    description: 'message',
  })
  message: string;
}

export class GetCommentDto {
  @ApiProperty({
    description: 'product id',
  })
  product_id: number;
  @ApiPropertyOptional({
    description: 'current page',
  })
  current_page: string;
}

export class EditCommentDto {
  @ApiProperty({
    description: 'product id',
  })
  comment_id: number;
  @ApiProperty({
    description: 'message',
  })
  message: string;
}
