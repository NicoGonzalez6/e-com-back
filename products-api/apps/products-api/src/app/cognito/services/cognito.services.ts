import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CognitoExpress from 'cognito-express';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class CognitoServices {
  constructor(private configService: ConfigService) {}

  cognito = {
    AWS_REGION: this.configService.get('AWS_REGION'),
    COGNITO_USER_POOL_ID: this.configService.get('COGNITO_USER_POOL_ID'),
    COGNITO_CLIENT_ID: this.configService.get('COGNITO_CLIENT_ID'),
  };

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
}
