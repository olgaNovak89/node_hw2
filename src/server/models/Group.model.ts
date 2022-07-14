import { Permission } from '@/types';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export class DataTypes_Permission extends DataType.ABSTRACT {
  key: Permission;
  type: string;
  constructor (permission: Permission) {
    super()
    this.key = permission 
  }
  toSql() {
    return 'VARBINARY(16)'
  }
  validate (value: string) {
    return ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'].includes(value)
  }
  _isChanged (value, originalValue) {
    if (value === originalValue) return false
    return true
  } 
  _stringify (permission) {
    return permission
  } 
}

@Table({ timestamps: false})
class Group extends Model<Group> {
 
  @Column({type: DataType.UUIDV4, allowNull: false, primaryKey: true, defaultValue: DataType.UUIDV4})
  id: string;
  @Column({type: DataType.STRING, allowNull: false})
  name: string;
 
  @Column({type: DataType.ARRAY( new DataTypes_Permission('DELETE')), allowNull: false})
  permissions: Permission[]
}
export default Group
