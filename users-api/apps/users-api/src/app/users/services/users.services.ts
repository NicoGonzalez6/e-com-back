import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '@users-api/database';
import { editUserDto } from '../dto';

@Injectable()
export class UserServices {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users
  ) {}

  async getCurrentUser(id: string) {
    const user = await this.usersModel.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ['user_status'],
      },
    });

    return user;
  }

  async getUserInfo(id: string) {
    const user = await this.usersModel.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ['user_status'],
      },
    });

    delete user['role'];

    return user;
  }

  async editCurrentUser(id: string, editUserDto: editUserDto) {
    const {
      city_id,
      last_name,
      name,
      phone_number,
      state_id,
      street_addres,
      street_number,
    } = editUserDto;

    let user = await this.usersModel.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('no user found');

    await this.usersModel.update(
      {
        city_id: city_id || user.dataValues.city_id,
        last_name: last_name || user.dataValues.last_name,
        name: name || user.dataValues.name,
        phone_number: phone_number || user.dataValues.phone_number,
        state_id: state_id || user.dataValues.state_id,
        street_addres: street_addres || user.dataValues.street_addres,
        street_number: street_number || user.dataValues.street_number,
      },
      {
        where: {
          id: id,
        },
      }
    );

    user = await this.usersModel.findOne({
      where: {
        id: id,
      },
    });

    return user;
  }
}
