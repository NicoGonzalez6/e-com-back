import {
  Table,
  Column,
  DataType,
  Index,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Model,
  DefaultScope,
} from 'sequelize-typescript';
import { productsI } from '../definitions';
import { Categories } from './categories';
import { CurrencyTypes } from './currency';
import { ProductState } from './productState';
import { SubCategories } from './subcategories';

@DefaultScope(() => ({
  attributes: {
    include: [
      'category.category_name',
      'subcategory.subcategory_name',
      'product_state.state',
      'currency.currency',
    ],
    exclude: [
      'product_state_id',
      'product_category_id',
      'product_subcategory_id',
      'product_currency_id',
    ],
  },
  raw: true,
  include: [
    {
      model: Categories,
      attributes: {
        exclude: ['id', 'category_name'],
      },
    },
    {
      model: SubCategories,
      attributes: [],
    },
    {
      model: ProductState,
      attributes: [],
    },
    {
      model: CurrencyTypes,
      attributes: [],
    },
  ],
}))
@Table({
  tableName: 'products',
})
export class Products extends Model<Products> implements productsI {
  @PrimaryKey
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_id: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Index
  product_name: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  product_description: string;
  @ForeignKey(() => CurrencyTypes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_currency_id: number;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  product_price: string;
  @ForeignKey(() => ProductState)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_state_id: number;
  @ForeignKey(() => Categories)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_category_id: number;
  @ForeignKey(() => SubCategories)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_subcategory_id: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  product_images: any;
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => CurrencyTypes)
  currency: CurrencyTypes;

  @BelongsTo(() => ProductState)
  product_state: ProductState;

  @BelongsTo(() => Categories)
  category: Categories;

  @BelongsTo(() => SubCategories)
  subcategory: SubCategories;
}
