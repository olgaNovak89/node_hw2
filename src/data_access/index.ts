
import { DataTypes, Sequelize } from 'sequelize';
import {DATABASE_URL} from '@/config'
export const sequelize = new Sequelize(DATABASE_URL,'postgres', 'qwerty');

const Users = sequelize.define('User', {
    id: {type: DataTypes.STRING, allowNull: false, primaryKey: true},
    login: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {tableName: 'User'})