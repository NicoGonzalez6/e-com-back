import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ImagesPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    Object.values(value).map((value) => {
      if (!value[0].mimetype.includes('image')) {
        throw new BadRequestException('wrong format image provided');
      }
    });

    return value;
  }
}
