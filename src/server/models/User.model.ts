import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript'
import Group from './group.model';
import UserToGroup from './user_to_group.model';
@Table({ timestamps: false, freezeTableName: true})
class User extends Model<User> {
  @BelongsToMany(() => Group, () => UserToGroup, 'id', 'userId')
  groups: Group[]

  @Column({type: DataType.UUIDV4, allowNull: false, primaryKey: true, defaultValue: DataType.UUIDV4})
  id: string;

  @Column({type: DataType.STRING, allowNull: false})
  login: string;
  @Column({type: DataType.STRING, allowNull: false})
  password: string
  @Column(DataType.INTEGER)
  age: number
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isDeleted: boolean
}
export default User
