import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import Group from '@/models/Group.model';
import Users from '@/models/User.model';

@Table({ timestamps: false})
class UserToGroup extends Model {
  @ForeignKey(() => Users)
  @Column({type: DataType.UUIDV4, allowNull: false})
  userId: string

  @ForeignKey(() => Group)
  @Column({type: DataType.UUIDV4, allowNull: false})
  groupId: string
}
export default UserToGroup;
