// import { Model, DataTypes } from 'sequelize';
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript'


import db from '@/models/index'
const { sequelize } = db;

@Table
class User extends Model<User> {
  @Column({type: DataType.STRING, allowNull: false, primaryKey: true})
  id: string;
  @Column({type: DataType.STRING, allowNull: false})
  login: string;
  @Column({type: DataType.STRING, allowNull: false})
  password: string
  @Column(DataType.INTEGER)
  age: number
  @Column(DataType.BOOLEAN)
  isDeleted: boolean
}

export default User
