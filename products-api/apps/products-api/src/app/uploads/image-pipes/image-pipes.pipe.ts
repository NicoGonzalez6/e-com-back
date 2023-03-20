import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ImagePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.mimetype.includes('image')) {
      throw new BadRequestException('wrong format image provided');
    }
    return value;
  }
}
