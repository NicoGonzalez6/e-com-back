import { Injectable, NotFoundException } from '@nestjs/common';
import { SubCategories, Categories } from '@products-api/database';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SubCategoriesServices {
  constructor(
    @InjectModel(SubCategories)
    private subcategoriesModel: typeof SubCategories,
    @InjectModel(Categories)
    private categoriesModel: typeof Categories
  ) {}

  async getAll() {
    return this.subcategoriesModel.findAll();
  }

  async create(parent_category_id: number, subcategory_name: string) {
    const category = await this.categoriesModel.findOne({
      where: {
        id: parent_category_id,
      },
    });

    if (!category) throw new NotFoundException('No category found');

    await this.subcategoriesModel.create({
      parent_category_id,
      subcategory_name: subcategory_name.toLocaleLowerCase(),
    });

    return true;
  }

  async edit(
    subcategory_id: number,
    parent_category_id: number,
    subcategory_name: string
  ) {
    const subcategory = await this.subcategoriesModel.findOne({
      where: {
        id: subcategory_id,
      },
    });

    if (!subcategory) throw new NotFoundException('No subcategory found');

    const category = await this.categoriesModel.findOne({
      where: {
        id: parent_category_id,
      },
    });

    if (!category) throw new NotFoundException('No category found');

    await this.subcategoriesModel.update(
      {
        subcategory_name:
          subcategory_name.toLocaleLowerCase() ||
          subcategory.dataValues.subcategory_name,
        parent_category_id:
          parent_category_id || subcategory.dataValues.parent_category_id,
      },
      {
        where: {
          id: subcategory_id,
        },
      }
    );

    return true;
  }
}
