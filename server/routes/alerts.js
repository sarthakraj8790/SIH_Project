import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/create', auth, async (req, res) => {
  try {
    const { type, title, description } = req.body;
    const alert = await prisma.alert.create({
      data: {
        type,
        title,
        description,
        userId: req.userId,
      },
    });
    res.json(alert);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create alert' });
  }
});

router.get('/list', auth, async (req, res) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(alerts);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch alerts' });
  }
});

router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const alert = await prisma.alert.update({
      where: { id },
      data: { status },
    });
    res.json(alert);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update alert status' });
  }
});

export default router;