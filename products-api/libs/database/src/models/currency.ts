import {
  Table,
  Column,
  DataType,
  Index,
  PrimaryKey,
  HasOne,
  Model,
} from 'sequelize-typescript';
import { currencyTypes, currencyTypesI } from '../definitions';
import { Products } from './products';

@Table({
  tableName: 'currency_types',
  timestamps: false,
})
export class CurrencyTypes
  extends Model<CurrencyTypes>
  implements currencyTypesI
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
  @Column({
    type: DataType.ENUM(currencyTypes.ARS, currencyTypes.USD),
    allowNull: false,
  })
  currency: currencyTypes.ARS | currencyTypes.USD;

  @HasOne(() => Products)
  product: Products;
}
