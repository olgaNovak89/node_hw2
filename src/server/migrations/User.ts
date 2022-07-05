'use strict';

import { DataTypes, QueryInterface, UUIDV4 } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          // autoIncrement: true,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age: DataTypes.INTEGER,
        isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
