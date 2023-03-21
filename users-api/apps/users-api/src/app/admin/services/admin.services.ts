import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '@users-api/database';
import { Op } from 'sequelize';
import { CognitoServices } from '../../cognito/services/cognito.services';
import { getAllUserI, getUsersCountI } from '../definitions';
import { usersModelsI } from '@users-api/definitions';

@Injectable()
export class AdminServices {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
    private cognitoServices: CognitoServices
  ) {}

  async getAllUsers(
    role: string,
    user_name: string,
    page = 1
  ): Promise<getAllUserI> {
    if (page < 1) throw new BadRequestException('page cannot be less than 1');

    const total_users = 15;

    let users = undefined;

    let total_pages = undefined;

    if (role) {
      users = await this.usersModel.findAll({
        where: {
          user_role_id: +role,
          name: {
            [Op.like]: `%${user_name}%`,
          },
        },

        order: [['name', 'ASC']],
        offset: total_users * (page - 1),
        limit: total_users,
      });

      total_pages = await this.usersModel.count({
        where: {
          user_role_id: +role,
          name: {
            [Op.like]: `%${user_name}%`,
          },
        },
      });

      return {
        total_users: users.length,
        current_page: +page,
        total_pages: Math.ceil(total_pages / total_users),
        users: users,
      };
    } else {
      users = await this.usersModel.findAll({
        where: {
          name: {
            [Op.like]: `%${user_name}%`,
          },
        },
        order: [['name', 'ASC']],
        offset: total_users * (page - 1),
        limit: total_users,
      });

      total_pages = await this.usersModel.count({
        where: {
          name: {
            [Op.like]: `%${user_name}%`,
          },
        },
      });

      return {
        total_users: users.length,
        current_page: +page,
        total_pages: Math.ceil(total_pages / total_users),
        users: users,
      };
    }
  }

  async getUserCounts(): Promise<getUsersCountI> {
    const total_users = await this.usersModel.count();

    const userInfo = {
      total_users,
    };

    return userInfo;
  }

  async getSingleUser(id: string): Promise<usersModelsI> {
    try {
      const user = await this.usersModel.findOne({
        where: {
          id: id,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException('user not found');
    }
  }

  async disableUser(id: string): Promise<boolean> {
    try {
      await this.cognitoServices.disableUser(id);
      await this.usersModel.update(
        {
          user_status: 'disabled',
        },
        {
          where: {
            id: id,
          },
        }
      );
      return true;
    } catch (error) {
      throw new NotFoundException('user not found');
    }
  }

  async enableUser(id: string): Promise<boolean> {
    try {
      await this.cognitoServices.enableUser(id);
      await this.usersModel.update(
        {
          user_status: 'enabled',
        },
        {
          where: {
            id: id,
          },
        }
      );
      return true;
    } catch (error) {
      throw new NotFoundException('user not found');
    }
  }
}
