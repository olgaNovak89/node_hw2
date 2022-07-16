import { Permission } from '@/types';
import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import Users from './User.model';
import UserToGroup from './user_to_group.model';

@Table({ timestamps: false, freezeTableName: true,})
class Group extends Model<Group> {
  @BelongsToMany(() => Users, () => UserToGroup, 'groupId')
  users: Users[]

  @Column({type: DataType.UUIDV4, allowNull: false, primaryKey: true, defaultValue: DataType.UUIDV4})
  id: string;
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.ARRAY(DataType.STRING), allowNull: false})
  permissions: Permission[]
}
export default Group
