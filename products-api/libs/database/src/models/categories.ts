import {
  Table,
  Column,
  DataType,
  Index,
  PrimaryKey,
  HasOne,
  Model,
  DefaultScope,
  HasMany,
} from 'sequelize-typescript';
import { categoriesI } from '../definitions';
import { Products } from './products';
import { SubCategories } from './subcategories';

@DefaultScope(() => ({
  attributes: ['id', 'category_name'],
}))
@Table({
  tableName: 'categories',
  timestamps: false,
})
export class Categories extends Model<Categories> implements categoriesI {
  @PrimaryKey
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category_name: string;

  @HasMany(() => SubCategories)
  sub_category: SubCategories;

  @HasOne(() => Products)
  product: Products;
}
