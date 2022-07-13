import { Table, Column, Model, DataType } from 'sequelize-typescript'
@Table({ timestamps: false})
class Users extends Model<Users> {
 
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
export default Users
