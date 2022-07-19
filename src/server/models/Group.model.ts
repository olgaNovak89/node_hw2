import { Permission } from '@/types';
import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import UserToGroup from '@/models/user_to_group.model';
import User from '@/models/user.model';

@Table({ timestamps: false, freezeTableName: true, })
class Group extends Model<Group> {
  @BelongsToMany(() => User, () => UserToGroup, 'groupId', 'groupId')
  users: User[]

  @Column({type: DataType.UUIDV4, allowNull: false, primaryKey: true, defaultValue: DataType.UUIDV4})
  id: string;
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.ARRAY(DataType.STRING), allowNull: false})
  permissions: Permission[]
}
export default Group
