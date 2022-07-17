'use strict';

import { DataTypes, QueryInterface  } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('UserToGroup', {
        // id: {
        //   type: DataTypes.NUMBER,
        //   autoIncrement: true,
        //   primaryKey: true,
        // },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        groupId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('UserToGroup');
  },
};
