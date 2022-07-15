import { Permission } from '@/types';
import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript';
import UserToGroup from './user_to_group.model';

// export class DataTypes_Permission extends DataType.ABSTRACT {
//   key: Permission;
//   type: string;
//   constructor (permission: Permission) {
//     super()
//     this.key = permission
//   }
//   toSql() {
//     return 'VARBINARY(16)'
//   }
//   validate (value: string) {
//     return ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'].includes(value)
//   }
//   _isChanged (value, originalValue) {
//     if (value === originalValue) return false
//     return true
//   }
//   _stringify (permission) {
//     return permission
//   }
// }

@Table({ timestamps: false})
class Group extends Model<Group> {
  @BelongsTo(() => UserToGroup, 'groupId')
  @Column({type: DataType.UUIDV4, allowNull: false, primaryKey: true, defaultValue: DataType.UUIDV4})
  id: string;
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.ARRAY(DataType.STRING), allowNull: false})
  permissions: Permission[]
}
export default Group
