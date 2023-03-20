import { Comments } from '@message-api/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommentsServices {
  constructor(
    @InjectModel(Comments)
    private commentsModel: typeof Comments
  ) {}

  async createNewComment(payload) {
    const comments = await this.commentsModel.findAll({
      where: {
        product_id: payload.product_id,
        user_id: payload.user_id,
      },
    });
    comments.map((comment) => {
      if (comment.responded == false) {
        throw new BadRequestException(
          'the user already have one current comment waiting for response'
        );
      }
    });

    const comment = await this.commentsModel.create(payload);
    return comment;
  }

  async getAllComments(product_id: number, current_page: string = '0') {
    const params = {
      where: {},
      offset: 20 * +current_page,
      limit: 20,
    };
    if (product_id) {
      params['where']['product_id'] = product_id;
    }
    const comments = await this.commentsModel.findAll({
      ...params,
      order: [['createdAt', 'ASC']],
    });

    if (comments.length == 0) {
      throw new NotFoundException('No comments found');
    }

    const total_coments = await this.commentsModel.count();

    return { total_coments, current_page: +current_page, comments };
  }

  async editComment(comment_id, message, user_id) {
    let comment = await this.commentsModel.findOne({
      where: {
        id: comment_id,
      },
    });

    if (!comment) {
      throw new NotFoundException('No comments found');
    }

    if (comment.user_id != user_id) {
      throw new ForbiddenException('Cannot edit another user comment');
    }

    await this.commentsModel.update(
      { message },
      {
        where: {
          id: comment_id,
        },
      }
    );

    comment = await this.commentsModel.findOne({
      where: {
        id: comment_id,
      },
    });

    return comment;
  }

  async deleteComment(comment_id, user_id) {
    let comment = await this.commentsModel.findOne({
      where: {
        id: comment_id,
      },
    });

    if (!comment) {
      throw new NotFoundException('No comments found');
    }

    if (comment.user_id != user_id) {
      throw new ForbiddenException('Cannot delete another user comment');
    }

    await this.commentsModel.destroy({
      where: {
        id: comment_id,
      },
    });

    return true;
  }
}
