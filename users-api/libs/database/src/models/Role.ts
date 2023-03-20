import {
  Table,
  Column,
  Model,
  DataType,
  Index,
  PrimaryKey,
  HasOne,
} from 'sequelize-typescript';
import { rolesI } from '../definitions';
import { Users } from './Users';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Roles extends Model<Roles> implements rolesI {
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
    type: DataType.ENUM('admin', 'user'),
    allowNull: false,
  })
  role: 'admin' | 'user';

  @HasOne(() => Users)
  user: Users;
}
