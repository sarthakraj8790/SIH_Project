import { DataSourceOptions } from "typeorm";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const config: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: ["server/entities/**/*.ts"],
  migrations: ["server/migrations/**/*.ts"],
  subscribers: ["server/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "server/entities",
    migrationsDir: "server/migrations",
    subscribersDir: "server/subscribers"
  }
};

export default config;