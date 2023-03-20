import {
  Table,
  Column,
  Model,
  DataType,
  Index,
  PrimaryKey,
  HasOne,
} from 'sequelize-typescript';
import { Icities } from '../definitions';
import { State } from './State';
import { Users } from './Users';

@Table({
  tableName: 'city',
  timestamps: false,
})
export class City extends Model<City> implements Icities {
  @PrimaryKey
  @Index
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city_name: string;

  @HasOne(() => State)
  state: State;

  @HasOne(() => Users)
  user: Users;
}
