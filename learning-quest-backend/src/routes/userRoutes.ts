import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  getUserGuilds,
} from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/me/guilds', getUserGuilds);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; 