import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./Entity/Product";

export const createDataSource = () =>
  new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Product],
    synchronize: false,
    extra: { connectionLimit: 2 },
  });
