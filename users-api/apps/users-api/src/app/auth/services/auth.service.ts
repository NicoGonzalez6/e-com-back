import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { models } from '@users-api/database';
import { CreateUsersDto, loginUserResponse } from '../dtos/users.dtos';
import { CognitoServices } from '../../cognito/services/cognito.services';
import { AuthenticationResultType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

@Injectable()
export class AuthServices {
  constructor(
    @InjectModel(models.Users)
    private usersModel: typeof models.Users,
    private cognitoServices: CognitoServices
  ) {}

  async saveNewUserToDb(usersDto: CreateUsersDto, group) {
    const {
      id,
      email,
      name,
      phone_number,
      street_addres,
      street_number,
      last_name,
      state_id,
      city_id,
    } = usersDto;

    const groupId = group == 'user' ? 2 : 1;
    try {
      await this.usersModel.create({
        id,
        email,
        name,
        last_name,
        phone_number,
        street_addres,
        street_number,
        state_id,
        city_id,
        user_role_id: groupId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(usersDto: CreateUsersDto, group) {
    const userId = await this.cognitoServices.cognitoSignUp(usersDto, group);
    const saveUserDto = { ...usersDto, id: userId };
    await this.saveNewUserToDb(saveUserDto, group);
    return true;
  }

  async signIn(email: string, password: string): Promise<loginUserResponse> {
    const AuthenticationResult = await this.cognitoServices.signInCognito(
      email,
      password
    );

    const user = await this.usersModel.findOne({
      where: {
        email: email,
      },
      attributes: {
        exclude: ['user_status'],
      },
    });
    return { ...AuthenticationResult, user: user };
  }

  async signOut(UserName): Promise<void> {
    await this.cognitoServices.signOutCognito(UserName);
  }

  async refreshSession(
    refreshToken: string
  ): Promise<AuthenticationResultType> {
    const tokens = await this.cognitoServices.refreshSession(refreshToken);

    return tokens;
  }
}
