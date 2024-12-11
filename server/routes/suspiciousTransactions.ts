import express from 'express';
import { AppDataSource } from '../config/database.js';
import { SuspiciousTransaction } from '../entities/SuspiciousTransaction.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const suspiciousTransactionRepository = AppDataSource.getRepository(SuspiciousTransaction);

router.get('/', auth, async (req, res) => {
  try {
    const transactions = await suspiciousTransactionRepository.find({
      where: { userId: req.userId },
      order: { timestamp: 'DESC' }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suspicious transactions' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await suspiciousTransactionRepository.findOne({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction details' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const transaction = suspiciousTransactionRepository.create({
      ...req.body,
      userId: req.userId
    });
    await suspiciousTransactionRepository.save(transaction);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create suspicious transaction' });
  }
});

export default router;