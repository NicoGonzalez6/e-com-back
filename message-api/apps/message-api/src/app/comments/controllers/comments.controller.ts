import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CognitoGuard } from '../../cognito/guards/cognito.guard';
import { AuthenticatedRequest } from '../../definitions';
import { CreateCommentDto, GetCommentDto, EditCommentDto } from '../dtos';
import { CommentsServices } from '../services/comments.services';

@ApiTags('Comments')
@Controller('/comments')
export class CommentsController {
  constructor(private commentService: CommentsServices) {}
  @Post('/')
  @UseGuards(CognitoGuard)
  async createNewComment(
    @Body() commentDto: CreateCommentDto,
    @Req() req: AuthenticatedRequest
  ) {
    const userId = req.user.id;

    return await this.commentService.createNewComment({
      ...commentDto,
      user_id: userId,
    });
  }

  @Get('/')
  async getComments(@Query() { product_id, current_page }: GetCommentDto) {
    return await this.commentService.getAllComments(product_id, current_page);
  }

  @Patch('/:comment_id')
  @UseGuards(CognitoGuard)
  async editComment(
    @Param() { comment_id }: EditCommentDto,
    @Body() { message }: EditCommentDto,
    @Req() req: AuthenticatedRequest
  ) {
    const userId = req.user.id;
    return await this.commentService.editComment(comment_id, message, userId);
  }

  @Delete('/:comment_id')
  @UseGuards(CognitoGuard)
  async deleteComment(
    @Param() { comment_id }: EditCommentDto,
    @Req() req: AuthenticatedRequest
  ) {
    const userId = req.user.id;
    return await this.commentService.deleteComment(comment_id, userId);
  }
}
