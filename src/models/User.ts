import { Sequelize, DataTypes, Model } from 'sequelize';
import {sequelize} from '@/access/index'
class UserModel extends Model {}
UserModel.init({
    id: {type: DataTypes.STRING, allowNull: false, primaryKey: true},
    login: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User'
});