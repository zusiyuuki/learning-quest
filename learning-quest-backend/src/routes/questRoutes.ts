import express from 'express';
import {
  getQuests,
  getQuestById,
  joinQuest,
  completeQuest,
  createQuest,
} from '../controllers/questController';

const router = express.Router();

router.get('/', getQuests);
router.get('/:id', getQuestById);
router.post('/', createQuest);
router.post('/:id/join', joinQuest);
router.post('/:id/complete', completeQuest);

export default router; 