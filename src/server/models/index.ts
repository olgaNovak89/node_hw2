import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
const basename = path.basename(module.filename);
// @ts-ignore
const env: 'test' | 'development' | 'production' = process.env.NODE_ENV || 'development';
// tslint-disable-next-line no-var-requires
import allConfig from '@/config/config';
import User from '@/models/User'

const config: any = allConfig[env];

const db: any = {};
const sequelize = config.use_env_variable ?
  new Sequelize(process.env[config.use_env_variable] || '') :
  new Sequelize(
      config.database, config.username, config.password, config
  );

sequelize.addModels([User]);
sequelize.authenticate().then(function(errors) { console.log(errors) });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
