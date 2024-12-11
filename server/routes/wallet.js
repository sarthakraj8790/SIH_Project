import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/analyze', auth, async (req, res) => {
  try {
    const { address } = req.body;
    const analysis = await prisma.walletAnalysis.create({
      data: {
        address,
        riskScore: Math.random() * 100,
        flags: JSON.stringify(['Suspicious activity', 'High-value transfers']),
        patterns: JSON.stringify(['Frequent small transfers', 'Round number transactions']),
      },
    });
    res.json(analysis);
  } catch (error) {
    res.status(400).json({ error: 'Analysis failed' });
  }
});

router.get('/history/:address', auth, async (req, res) => {
  try {
    const { address } = req.params;
    const analyses = await prisma.walletAnalysis.findMany({
      where: { address },
      orderBy: { createdAt: 'desc' },
    });
    res.json(analyses);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch history' });
  }
});

export default router;