import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CognitoGuard } from '../../cognito/guards/cognito.guard';
import { DeleteImageDto, UploadImageDto, DeleteImagesDto } from '../dtos';
import { UploadServices } from '../services/upload.services';
import { AuthenticatedRequest } from '../../definitions';
import { ImagePipe } from '../image-pipes/image-pipes.pipe';
import { ImagesPipe } from '../image-pipes/images-pipes.pipe';

@Controller('image')
@ApiTags('Uploads')
export class UploadControllers {
  constructor(private uploadServices: UploadServices) {}
  @Post('/:product_id')
  @UseGuards(CognitoGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(new ImagePipe()) file,
    @Param() { product_id }: UploadImageDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user_id = req.user.id;
    return await this.uploadServices.upload(file, product_id, user_id);
  }

  @Post('/files/:product_id')
  @UseGuards(CognitoGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file1', maxCount: 1 },
      { name: 'file2', maxCount: 2 },
      { name: 'file3', maxCount: 3 },
      { name: 'file4', maxCount: 4 },
      { name: 'file5', maxCount: 5 },
    ])
  )
  async uploadFiles(
    @UploadedFiles(new ImagesPipe()) files,
    @Param() { product_id }: UploadImageDto,
    @Req() req: AuthenticatedRequest
  ) {
    const allFiles = [...Object.values(files)];

    const user_id = req.user.id;

    return await this.uploadServices.uploadFiles(allFiles, product_id, user_id);
  }
  @Delete('/:product_id/:keyName')
  @UseGuards(CognitoGuard)
  async deleteImage(
    @Param() { keyName, product_id }: DeleteImageDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user_id = req.user.id;
    const isAdmin = req.user.isAdmin;
    return await this.uploadServices.delete(
      product_id,
      keyName,
      user_id,
      isAdmin
    );
  }

  @Delete('/:product_id')
  @UseGuards(CognitoGuard)
  async deleteAllImages(
    @Param() { product_id }: DeleteImagesDto,
    @Req() req: AuthenticatedRequest
  ) {
    const isAdmin = req.user.isAdmin;
    const user_id = req.user.id;
    return await this.uploadServices.deleteImages(product_id, user_id, isAdmin);
  }
}
