import {
  Table,
  Column,
  DataType,
  Index,
  PrimaryKey,
  HasOne,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { subcategoriesI } from '../definitions';
import { Categories } from './categories';
import { Products } from './products';

@Table({
  tableName: 'subcategories',
  timestamps: false,
})
export class SubCategories
  extends Model<SubCategories>
  implements subcategoriesI
{
  @PrimaryKey
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Categories)
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  parent_category_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subcategory_name: string;

  @BelongsTo(() => Categories)
  category: Categories;

  @HasOne(() => Products)
  product: Products;
}
