import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CognitoServices } from '../services/cognito.services';
import { AuthenticatedRequest } from '../../definitions';
@Injectable()
export class CognitoGuard implements CanActivate {
  constructor(private readonly cognitoService: CognitoServices) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<any | AuthenticatedRequest>();

    try {
      const decodedJwt = await this.cognitoService.verifyHeaders(
        request.headers
      );

      const role: string = this.cognitoService.getUserRole(
        decodedJwt['cognito:groups']
      );
      const isAdmin = role.toLowerCase().includes('admin');

      if (!request.user) {
        request.user = {
          id: decodedJwt.username,
          jwt: decodedJwt,
          role,
          isAdmin,
        };
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
