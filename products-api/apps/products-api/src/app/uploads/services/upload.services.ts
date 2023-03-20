import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from '@products-api/database';
import { uploadS3, deleteObject } from '../utils';

@Injectable()
export class UploadServices {
  constructor(
    private configService: ConfigService,
    @InjectModel(Products)
    private productsModel: typeof Products
  ) {}

  aws_instance = {
    s3: new S3({
      region: this.configService.get('AWS_REGION'),
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    }),
    bucket_name: `${this.configService.get('S3_BUCKET_NAME')}/product_images`,
    imagePrefix: 'product_images/',
  };

  //upload file service
  async upload(file, product_id, user_id) {
    if (!file) {
      throw new BadRequestException('no image provided');
    }
    const { originalname } = file;

    let product = await this.productsModel.findOne({
      where: {
        id: product_id,
        user_id: user_id,
      },
    });

    if (!product) throw new NotFoundException('product not found');
    if (
      product.product_images &&
      product.product_images.some((value) => value.id == originalname)
    )
      throw new BadRequestException('image key already exists');

    if (product.product_images && product.product_images.length == 5)
      throw new BadRequestException('no more than 5 image per product allowed');

    const currentImages = product.product_images || [];

    const productId = product.id;

    const data = await uploadS3(
      file,
      this.aws_instance.bucket_name,
      originalname,
      productId,
      this.aws_instance.s3
    );

    await this.productsModel.update(
      {
        product_images: [
          ...currentImages,
          {
            id: originalname,
            key: data.Key,
          },
        ],
      },
      {
        where: {
          id: product_id,
        },
      }
    );

    product = await this.productsModel.findOne({
      where: {
        id: product_id,
        user_id: user_id,
      },
    });

    return product;
  }
  //upload files service
  async uploadFiles(files, product_id, user_id) {
    if (!files || files.length == 0) {
      throw new BadRequestException('no image provided');
    }
    let product = await this.productsModel.findOne({
      where: {
        id: product_id,
        user_id: user_id,
      },
    });
    if (!product) throw new NotFoundException('product not found');
    for (const file of files) {
      product = await this.productsModel.findOne({
        where: {
          id: product_id,
        },
      });

      const { originalname } = file[0];

      if (
        product.product_images &&
        product.product_images.some((value) => value.id == originalname)
      )
        throw new BadRequestException('image key already exists');

      if (product.product_images && product.product_images.length == 5)
        throw new BadRequestException(
          'no more than 5 image per product allowed'
        );

      const currentImages = product.product_images || [];

      const productId = product.id;

      const data = await uploadS3(
        file[0],
        this.aws_instance.bucket_name,
        originalname,
        productId,
        this.aws_instance.s3
      );

      await this.productsModel.update(
        {
          product_images: [
            ...currentImages,
            {
              id: originalname,
              key: data.Key,
            },
          ],
        },
        {
          where: {
            id: product_id,
          },
        }
      );
    }

    product = await this.productsModel.findOne({
      where: {
        id: product_id,
      },
    });

    return product;
  }

  //delete service
  async delete(
    product_id: number,
    keyName: string,
    user_id: string,
    isAdmin: boolean
  ) {
    let product = await this.productsModel.findOne({
      where: {
        id: product_id,
      },
    });

    if (!product) throw new NotFoundException('product not found');
    if (product.user_id != user_id || !isAdmin)
      throw new ForbiddenException(
        'The current user its not the owner of the product'
      );
    if (
      product.product_images &&
      !product.product_images.some((value) => value.id == keyName)
    )
      throw new BadRequestException('the image does not exist');

    const newImagesValues =
      product.product_images &&
      product.product_images.filter((values) => values.id != keyName);

    if (newImagesValues.length == 0) {
      await this.productsModel.update(
        {
          product_images: null,
        },
        {
          where: {
            id: product_id,
          },
        }
      );
    } else {
      await this.productsModel.update(
        {
          product_images: newImagesValues,
        },
        {
          where: {
            id: product_id,
          },
        }
      );
    }

    product = await this.productsModel.findOne({
      where: {
        id: product_id,
      },
    });

    await deleteObject(`${product.id}/${keyName}`, this.aws_instance);
    return product;
  }

  //delete service
  async deleteImages(product_id: number, user_id: string, isAdmin: boolean) {
    let product = await this.productsModel.findOne({
      where: {
        id: product_id,
      },
    });

    if (!product) throw new NotFoundException('product not found');

    if (product.user_id != user_id && !isAdmin) {
      throw new ForbiddenException(
        'The current user its not the owner of the product'
      );
    }

    if (product.product_images && product.product_images.length > 0) {
      for (const image of product.product_images) {
        await deleteObject(`${product.id}/${image.id}`, this.aws_instance);
      }

      await this.productsModel.update(
        {
          product_images: null,
        },
        {
          where: {
            id: product_id,
          },
        }
      );
    }

    return true;
  }
}
