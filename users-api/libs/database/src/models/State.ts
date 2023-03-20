import {
  Table,
  Column,
  Model,
  DataType,
  Index,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasOne,
  DefaultScope,
} from 'sequelize-typescript';
import { Istates } from '../definitions';
import { City } from './City';
import { Users } from './Users';

@DefaultScope(() => ({
  attributes: {
    exclude: ['city_id'],
  },
}))
@Table({
  tableName: 'state',
  timestamps: false,
})
export class State extends Model<State> implements Istates {
  @PrimaryKey
  @Index
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;
  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  city_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state_name: string;

  @BelongsTo(() => City)
  city: City;
  @HasOne(() => Users)
  user: Users;
}
