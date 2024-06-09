import { Sequelize } from 'sequelize-typescript';
import config from './config/config';
import { User } from './models/user';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

const sequelize = new Sequelize(dbConfig);
sequelize.addModels([User]);

export default sequelize;
