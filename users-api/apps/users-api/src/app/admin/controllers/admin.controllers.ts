import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CognitoGuard, AdminGuard } from '../../cognito/guards';
import { AdminServices } from '../services/admin.services';
import { GetAlluserQuerysDto, GetSingleUserDto } from '../dtos';
import { CreateUsersDto } from '../../auth/dtos';
import { AuthServices } from '../../auth/services/auth.service';
import { cognitoUsersGroups } from '../../cognito/dtos';
import { CreateUserPipe } from '../../auth/pipes/signUp.pipe';

@ApiTags('Admin routes')
@Controller('admin')
export class AdminControllers {
  constructor(
    private adminServices: AdminServices,
    private authServices: AuthServices
  ) {}
  @Get('/')
  @UseGuards(CognitoGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  async getAllUsers(@Query() { role, user_name, page }: GetAlluserQuerysDto) {
    return await this.adminServices.getAllUsers(role, user_name, page);
  }

  @Get('/user-counts')
  @UseGuards(CognitoGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  async userCounts() {
    return await this.adminServices.getUserCounts();
  }

  @Get('/:id')
  @UseGuards(CognitoGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  async getSingleUser(@Param() { id }: GetSingleUserDto) {
    return await this.adminServices.getSingleUser(id);
  }

  @Get('/disable/:id')
  @UseGuards(CognitoGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  async disableUser(@Param() { id }: GetSingleUserDto) {
    return await this.adminServices.disableUser(id);
  }

  @Get('/enable/:id')
  @UseGuards(CognitoGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  async enableUser(@Param() { id }: GetSingleUserDto) {
    return await this.adminServices.enableUser(id);
  }

  @Post('/')
  async createNewAdmin(
    @Body(new CreateUserPipe()) createUserDto: CreateUsersDto
  ) {
    return await this.authServices.signUp(
      createUserDto,
      cognitoUsersGroups.admin
    );
  }
}
