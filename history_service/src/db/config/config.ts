import 'dotenv/config';
import { Options } from "sequelize";

interface ConfigTs {
  development: Options;
  test: Options;
  production: Options;
}

const configDB: ConfigTs = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
    },
    define: {
      timestamps: false,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
    },
    define: {
      timestamps: false,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
      multipleStatements: true,
    },
    logging: false,
    define: {
      timestamps: false,
    },
  },
};
export default configDB;

module.exports = configDB;
