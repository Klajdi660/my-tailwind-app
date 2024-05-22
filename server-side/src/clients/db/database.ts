import config from "config";
import { Sequelize } from "sequelize";
import { MysqlParams } from "../../types";

const {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
} = config.get<MysqlParams>("mysql");

const dbDriver = "mysql";

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
  define: {
    timestamps: false,
  },
  query: {
    raw: true,
  },
});
