import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config(); // Cargar variables desde .env


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_RENDER_INT_DATABASE_URL,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
    logging: false,
  }}
});

/*
//para render con back end alojado en local
const sequelize = new Sequelize(process.env.RENDER_EXT_DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Conexión a PostgreSQL de Render establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar con PostgreSQL de Render:", error);
    }
};
*/

export { sequelize, connectDB };