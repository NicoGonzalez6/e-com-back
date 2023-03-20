import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Model,
  Index,
  DefaultScope,
} from 'sequelize-typescript';
import { commentsModelI } from '../definitions';

@DefaultScope(() => ({
  raw: true,
  attributes: {
    exclude: ['product_id'],
  },
}))
@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comments extends Model<Comments> implements commentsModelI {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_id: string;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  responded: boolean;
  @Column({
    type: DataType.ENUM('enabled', 'disabled'),
    allowNull: false,
    defaultValue: 'enabled',
  })
  comment_state: 'enabled' | 'disabled';
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;
  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
}
