'use strict';

import { DataTypes, QueryInterface, UUIDV4 } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('UserToGroup', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        groupId: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
      });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('UserToGroup');
  },
};
