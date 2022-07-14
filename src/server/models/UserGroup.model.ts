import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import Group from '@/models/Group.model';
import Users from '@/models/User.model';

@Table({ timestamps: false})
class UserGroup extends Model {
  @ForeignKey(() => Users)
  @Column
  userId: string

  @ForeignKey(() => Group)
  @Column
  groupId: string
}
export default UserGroup;