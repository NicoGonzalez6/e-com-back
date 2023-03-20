import { usersModelsI } from '../definitions';
import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DefaultScope,
  Index,
  Unique,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { City } from './City';
import { State } from './State';
import { Roles } from './Role';

@DefaultScope(() => ({
  attributes: {
    exclude: [
      'createdAt',
      'updatedAt',
      'user_role',
      'city_id',
      'state_id',
      'user_role_id',
    ],
    include: ['city.city_name', 'state.state_name', 'role.role'],
  },
  raw: true,
  include: [
    {
      model: City,
      attributes: [],
    },
    {
      model: State,
      attributes: [],
    },
    {
      model: Roles,
      attributes: [],
    },
  ],
}))
@Table({
  tableName: 'users',
})
export class Users extends Model<Users> implements usersModelsI {
  @PrimaryKey
  @Index
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;
  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street_addres: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street_number: string;
  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  city_id: number;
  @ForeignKey(() => State)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  state_id: number;

  @Column({
    type: DataType.ENUM('enabled', 'disabled'),
    allowNull: false,
    defaultValue: 'enabled',
  })
  user_status: 'enabled' | 'disabled';

  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  user_role_id: number;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;

  @BelongsTo(() => City)
  city: City;
  @BelongsTo(() => State)
  state: State;
  @BelongsTo(() => Roles)
  role: Roles;
}
