'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('Users', {
        id: {type: DataTypes.STRING, allowNull: false, primaryKey: true},
        login: {type: DataTypes.STRING, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        age: DataTypes.INTEGER,
        isDeleted: DataTypes.BOOLEAN,
      });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
