import { Sequelize } from 'sequelize-typescript';
import config from './config/config';
import { History } from './models/history';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

const sequelize = new Sequelize(dbConfig);
sequelize.addModels([History]);

export default sequelize;
