import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { CreateUsersDto } from '../../auth/dtos/users.dtos';
import { cognitoUsersGroups } from '../dtos/cognito.definitions';
import CognitoExpress from 'cognito-express';
import { IncomingHttpHeaders } from 'http';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class CognitoServices {
  constructor(private configService: ConfigService) {}

  cognito = {
    AWS_REGION: this.configService.get('AWS_REGION'),
    COGNITO_USER_POOL_ID: this.configService.get('COGNITO_USER_POOL_ID'),
    COGNITO_CLIENT_ID: this.configService.get('COGNITO_CLIENT_ID'),
  };

  cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
    region: this.cognito.AWS_REGION,
  });

  cognitoExpress = new CognitoExpress({
    region: this.cognito.AWS_REGION,
    cognitoUserPoolId: this.cognito.COGNITO_USER_POOL_ID,
    tokenUse: 'access',
    tokenExpiration: 3600,
  });

  getUserRole(cognitoGroups: string[]) {
    return cognitoGroups?.[0];
  }

  verifyHeaders({ authorization = '' }: IncomingHttpHeaders): Promise<any> {
    const [protocol, token] = authorization.split(' ');
    if (protocol === 'Bearer' && token) return this.verifyToken(token);
    throw new UnauthorizedException();
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.cognitoExpress.validate(token);
    } catch (err) {
      console.log(err.message, err.stack);
    }
  }

  async asignUserToGroup(email: string, group: string) {
    await this.cognitoIdentityServiceProvider.adminAddUserToGroup(
      {
        Username: email,
        UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
        GroupName: group,
      },
      function (err, data) {
        if (err) console.log(err, err.stack);
      }
    );
  }

  async setPermanentUserPassword(
    userId: string,
    password: string,
    permanent = true
  ) {
    await this.cognitoIdentityServiceProvider
      .adminSetUserPassword({
        Username: userId,
        UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
        Password: password,
        Permanent: permanent,
      })
      .promise();
  }

  async cognitoSignUp(usersDto: CreateUsersDto, group = 'user') {
    const { email, name, phone_number, password } = usersDto;
    const {
      User: { Username: userId },
    } = await this.cognitoIdentityServiceProvider
      .adminCreateUser({
        UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
        Username: email,
        UserAttributes: [
          { Name: 'name', Value: name },
          { Name: 'email', Value: email },
          { Name: 'phone_number', Value: phone_number },
          { Name: 'email_verified', Value: 'true' },
          { Name: 'phone_number_verified', Value: 'true' },
        ],
        MessageAction: 'SUPPRESS',
      })
      .promise();

    const cognitoGroup =
      group == 'user' ? cognitoUsersGroups.user : cognitoUsersGroups.admin;

    await this.asignUserToGroup(email, cognitoGroup);

    await this.setPermanentUserPassword(userId, password);
    return userId;
  }

  async refreshSession(refreshToken: string) {
    const params = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
      ClientId: this.cognito.COGNITO_CLIENT_ID as string,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    };

    const { AuthenticationResult } = await this.cognitoIdentityServiceProvider
      .adminInitiateAuth(params, function (err, data) {
        if (err) console.log(err);
        return data;
      })
      .promise();

    return AuthenticationResult;
  }

  async signInCognito(email: string, password: string) {
    const { AuthenticationResult } = await this.cognitoIdentityServiceProvider
      .adminInitiateAuth({
        UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
        ClientId: this.cognito.COGNITO_CLIENT_ID as string,
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
      .promise();
    return AuthenticationResult;
  }

  async signOutCognito(Username: string) {
    await this.cognitoIdentityServiceProvider.adminUserGlobalSignOut(
      {
        UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
        Username: Username,
      },
      function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );
  }

  async getAllUsersInUsersGroup(role: string) {
    let data = undefined;

    if (role) {
      data = await this.cognitoIdentityServiceProvider
        .listUsersInGroup(
          {
            GroupName: role,
            UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
          },
          async function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else return data;
          }
        )
        .promise();
    } else {
      data = await this.cognitoIdentityServiceProvider
        .listUsers(
          {
            UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
          },
          async function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else return data;
          }
        )
        .promise();
    }

    return data.Users.map((user) => user.Username);
  }

  async getSingleUser(id: string) {
    const data = await this.cognitoIdentityServiceProvider
      .adminGetUser(
        {
          Username: id /* required */,
          UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
        },
        async function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else return data;
        }
      )
      .promise();
    return data.Username;
  }

  async disableUser(id: string) {
    const params = {
      UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
      Username: id,
    };

    try {
      await this.cognitoIdentityServiceProvider
        .adminDisableUser(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else console.log(data); // successful response
        })
        .promise();
      return true;
    } catch (error) {
      throw new BadRequestException('an error ocurred');
    }
  }

  async enableUser(id: string) {
    const params = {
      UserPoolId: this.cognito.COGNITO_USER_POOL_ID as string,
      Username: id,
    };

    try {
      await this.cognitoIdentityServiceProvider
        .adminEnableUser(params, function (err, data) {
          if (err) console.log(err, err.stack);
          else console.log(data);
        })
        .promise();
      return true;
    } catch (error) {
      throw new BadRequestException('an error ocurred');
    }
  }
}
