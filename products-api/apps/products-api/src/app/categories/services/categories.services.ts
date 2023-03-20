import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Categories, SubCategories } from '@products-api/database';

@Injectable()
export class CategoriesServices {
  constructor(
    @InjectModel(Categories)
    private categoryModel: typeof Categories,
    @InjectModel(SubCategories)
    private subcategoryModel: typeof SubCategories
  ) {}
  async getAll() {
    return this.categoryModel.findAll({
      include: [
        {
          model: this.subcategoryModel,
          attributes: {
            exclude: ['parent_category_id'],
          },
        },
      ],
    });
  }

  async create(category_name: string) {
    try {
      await this.categoryModel.create({
        category_name: category_name.toLocaleLowerCase(),
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async edit(id: number, category_name: string) {
    const Category = await this.categoryModel.findOne({
      where: {
        id: id,
      },
    });

    if (Category == null) throw new NotFoundException('Category not found');

    await this.categoryModel.update(
      {
        category_name: category_name.toLocaleLowerCase(),
      },
      {
        where: {
          id: id,
        },
      }
    );

    return true;
  }
}
