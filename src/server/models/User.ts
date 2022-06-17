import { Sequelize, Model, DataTypes } from 'sequelize';
import db from '../models/index.js'
const { sequelize } = db;
  class UserModel extends Model {

  }
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
export default UserModel