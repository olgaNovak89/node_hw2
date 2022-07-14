'use strict';

import { DataTypes_Permission } from '@/models/Group.model';
import { DataTypes, QueryInterface, UUIDV4 } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('Group', {
        id: {
          allowNull: false,
          // autoIncrement: true,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        permissions: {
          type: DataTypes.ARRAY(DataTypes_Permission),
          allowNull: false
        }
      });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Group');
  },
};
