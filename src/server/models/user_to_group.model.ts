import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import Group from '@/models/group.model';
import User from '@/models/user.model';

@Table({ timestamps: false, freezeTableName: true})
class UserToGroup extends Model {
  @ForeignKey(() => User)
  @Column({type: DataType.UUIDV4, allowNull: false, field: 'user_id'})
  userId: string

  @ForeignKey(() => Group)
  @Column({type: DataType.UUIDV4, allowNull: false, field: 'group_id'})
  groupId: string
}
export default UserToGroup;
