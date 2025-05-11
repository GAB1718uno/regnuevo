import { Sequelize } from "sequelize";

console.log("☁️  DB_HOST =", process.env.DB_HOST);
console.log("☁️  DB_PORT =", process.env.DB_PORT);
console.log("☁️  DB_USER =", process.env.DB_USER);
console.log("☁️  DB_NAME =", process.env.DB_NAME);

const db = new Sequelize(
  process.env.DB_NAME || "cementerio",
  process.env.DB_USER || "gilso",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "167.71.36.17",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mariadb",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 10000,
    },
    logging: false,
  }
);

export default db;
