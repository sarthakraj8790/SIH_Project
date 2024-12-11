import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/report', auth, async (req, res) => {
  try {
    const { title, description, type, data } = req.body;
    const report = await prisma.report.create({
      data: {
        title,
        description,
        type,
        data: JSON.stringify(data),
        userId: req.userId,
      },
    });
    res.json(report);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create report' });
  }
});

router.get('/reports', auth, async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(reports);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch reports' });
  }
});

export default router;