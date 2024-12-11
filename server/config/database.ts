import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Alert } from "../entities/Alert";
import { Report } from "../entities/Report";
import { WalletAnalysis } from "../entities/WalletAnalysis";
import { SuspiciousTransaction } from "../entities/SuspiciousTransaction";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: [User, Alert, Report, WalletAnalysis, SuspiciousTransaction],
  migrations: ["server/migrations/*.ts"],
  subscribers: [],
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default AppDataSource;