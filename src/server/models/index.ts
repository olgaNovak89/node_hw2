import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes} from 'sequelize';
const basename = path.basename(module.filename);
// @ts-ignore
const env: 'test' | 'development' | 'production' = process.env.NODE_ENV || 'development';
// tslint-disable-next-line no-var-requires
import allConfig from '../config/config.json';
const config: any = allConfig[env];
const db: any = {};

const sequelize = config.use_env_variable ? new Sequelize(process.env[config.use_env_variable]) : new Sequelize(
      config.database, config.username, config.password, config
  );

fs.readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, DataTypes)
      db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;