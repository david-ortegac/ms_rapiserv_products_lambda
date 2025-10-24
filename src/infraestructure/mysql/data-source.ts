import "reflect-metadata";

import { DataSource } from "typeorm";

import { Product } from "./Entity/Product";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV !== "production", // Solo en desarrollo
  logging: process.env.NODE_ENV === "development",
  entities: [Product],
  migrations: [],
  subscribers: [],
  // Configuraciones optimizadas para Lambda
  extra: {
    connectionLimit: 1, // Lambda solo necesita 1 conexión
  },
});
