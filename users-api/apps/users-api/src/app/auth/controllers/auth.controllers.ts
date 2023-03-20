import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthServices } from '../services/auth.service';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUsersDto, LoginUserDto, RefreshDto } from '../dtos';
import { CreateUserPipe } from '../pipes/signUp.pipe';
import { CognitoGuard } from '../../cognito/guards/cognito.guard';
import { AuthenticatedRequest } from '../../definitions';
import { cognitoUsersGroups } from '../../cognito/dtos';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthServices) {}

  @Post('/signUp')
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: 'Endpoint for register new users',
  })
  async signUpUser(@Body(new CreateUserPipe()) createUserDto: CreateUsersDto) {
    const newUser = await this.authServices.signUp(
      createUserDto,
      cognitoUsersGroups.user
    );
    return newUser;
  }

  @Post('/signIn')
  @ApiResponse({
    status: 200,
    description: 'Endpoint for login users',
  })
  async signInUser(@Body() loginBody: LoginUserDto) {
    const loginUser = await this.authServices.signIn(
      loginBody.email,
      loginBody.password
    );
    return loginUser;
  }

  @Post('/signOut')
  @ApiResponse({
    status: 200,
    description: 'Endpoint for logout users',
  })
  @UseGuards(CognitoGuard)
  @HttpCode(200)
  async signOut(@Req() req: AuthenticatedRequest) {
    await this.authServices.signOut(req.user.id);
    return true;
  }

  @Post('/refreshSession')
  @ApiResponse({
    status: 200,
    description: 'Endpoint for refresh users session',
  })
  @HttpCode(200)
  @ApiBearerAuth('access-token')
  async refreshSession(@Body() { refreshToken }: RefreshDto) {
    const tokens = await this.authServices.refreshSession(refreshToken);
    return tokens;
  }
}
