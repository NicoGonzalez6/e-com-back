import { Injectable, NotFoundException } from '@nestjs/common';
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
    page: number
  ): Promise<getAllUserI> {
    let users = undefined;

    if (role) {
      users = await this.usersModel.findAll({
        where: {
          user_role_id: +role,
          name: {
            [Op.like]: `%${user_name}%`,
          },
        },

        order: [['name', 'ASC']],
        offset: 20 * page,
        limit: 20,
      });
      return { total_users: users.length, current_page: +page, users: users };
    } else {
      users = await this.usersModel.findAll({
        where: {
          name: {
            [Op.like]: `%${user_name}%`,
          },
        },

        order: [['name', 'ASC']],
        offset: 20 * page,
        limit: 20,
      });

      return { total_users: users.length, current_page: +page, users: users };
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
