import {
  Controller,
  Get,
  Req,
  UseGuards,
  Body,
  Patch,
  UsePipes,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../../definitions';
import { CognitoGuard } from '../../cognito/guards';
import { UserServices } from '../services/users.services';
import { editUserDto, getUserInfoDto } from '../dto';
import { EditUserPipe } from '../pipes/edit.pipes';

@ApiTags('Users Routes')
@Controller('users')
export class UsersControllers {
  constructor(private userServices: UserServices) {}

  @Get('/currentUser')
  @UseGuards(CognitoGuard)
  async getCurrentUser(@Req() req: AuthenticatedRequest): Promise<any> {
    const { id } = req.user;
    return this.userServices.getCurrentUser(id);
  }

  @Get('/userInfo/:user_id')
  async getUserInfo(@Param() { user_id }: getUserInfoDto): Promise<any> {
    return this.userServices.getUserInfo(user_id);
  }

  @Patch('/edit')
  @UseGuards(CognitoGuard)
  @UsePipes(EditUserPipe)
  async editCurrentUser(
    @Req() req: AuthenticatedRequest,
    @Body() editUserDto: editUserDto
  ): Promise<any> {
    const { id } = req.user;
    return this.userServices.editCurrentUser(id, editUserDto);
  }
}
