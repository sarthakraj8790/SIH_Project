import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { initializeDatabase } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import alertsRoutes from './routes/alerts.js';
import analysisRoutes from './routes/analysis.js';
import walletRoutes from './routes/wallet.js';
import suspiciousTransactionsRoutes from './routes/suspiciousTransactions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
initializeDatabase().catch(console.error);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/suspicious-transactions', suspiciousTransactionsRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle cleanup
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Performing cleanup...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Performing cleanup...');
  process.exit(0);
});