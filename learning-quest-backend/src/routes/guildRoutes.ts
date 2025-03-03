import express from 'express';
import {
  getGuilds,
  getGuildById,
  createGuild,
  joinGuild,
  leaveGuild,
} from '../controllers/guildController';

const router = express.Router();

router.get('/', getGuilds);
router.get('/:id', getGuildById);
router.post('/', createGuild);
router.post('/join', joinGuild);
router.post('/leave', leaveGuild);

export default router; 