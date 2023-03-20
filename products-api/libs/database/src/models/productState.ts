import {
  Table,
  Column,
  DataType,
  Index,
  PrimaryKey,
  HasOne,
  Model,
} from 'sequelize-typescript';
import { productStateI, productStates } from '../definitions';
import { Products } from './products';

@Table({
  tableName: 'product_state',
  timestamps: false,
})
export class ProductState extends Model<ProductState> implements productStateI {
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
    type: DataType.ENUM(productStates.new, productStates.used),
    allowNull: false,
  })
  state: productStates.new | productStates.used;

  @HasOne(() => Products)
  product: Products;
}
