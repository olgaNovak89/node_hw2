import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { v4 as uuid } from 'uuid';
@Table
class Users extends Model<Users> {
  @Column({type: DataType.UUIDV4, allowNull: false, primaryKey: true, defaultValue: DataType.UUIDV4})
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
Users.addHook('beforeSave', (user) => {
  user['id'] = uuid();
});
export default Users
