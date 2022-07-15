import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
const basename = path.basename(module.filename);
// @ts-ignore
const env: 'test' | 'development' | 'production' = process.env.NODE_ENV || 'development';
// tslint-disable-next-line no-var-requires
import allConfig from '@/config/config';
import Users from '@/models/User.model'
import Group from '@/models/Group.model';
import UserToGroup from '@/models/user_to_group.model';

const config: any = allConfig[env];

const db: any = {};
const sequelize = config.use_env_variable ?
  new Sequelize(process.env[config.use_env_variable] || '') :
  new Sequelize(
      config.database, config.username, config.password, {
        host: '127.0.0.1',
        dialect: 'postgres',
      },
  );

sequelize.addModels([Users, Group, UserToGroup]);
sequelize.authenticate()
  .then((/* err */) => {
    console.log('----------------------------------------')
    console.log('DATABASE √')
    console.log('    HOST     %s', config.host)
    console.log('    PORT     %s', config.port)
    console.log('    DATABASE %s', config.database)
    console.log('----------------------------------------')
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err)
  })
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
