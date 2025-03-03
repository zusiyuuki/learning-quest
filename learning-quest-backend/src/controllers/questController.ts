import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Quest from '../models/Quest';
import User from '../models/User';

export const getQuests = async (req: Request, res: Response) => {
  try {
    const quests = await Quest.find().populate('guildId', 'name');
    res.json(quests);
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const getQuestById = async (req: Request, res: Response) => {
  try {
    const quest = await Quest.findById(req.params.id).populate('guildId', 'name');
    if (!quest) {
      return res.status(404).json({ message: 'クエストが見つかりません' });
    }
    res.json(quest);
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const joinQuest = async (req: Request, res: Response) => {
  try {
    const questId = req.params.id;
    const { userId } = req.body;

    // ObjectIdに変換
    const questObjectId = new mongoose.Types.ObjectId(questId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const quest = await Quest.findById(questObjectId);
    const user = await User.findById(userObjectId);

    if (!quest || !user) {
      return res.status(404).json({ message: 'クエストまたはユーザーが見つかりません' });
    }

    if (quest.participants.some(id => id.toString() === userObjectId.toString())) {
      return res.status(400).json({ message: '既にクエストに参加しています' });
    }

    quest.participants.push(userObjectId);
    quest.status = 'in_progress';
    await quest.save();

    res.json({ message: 'クエストに参加しました' });
  } catch (error) {
    console.error('Error in joinQuest:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const completeQuest = async (req: Request, res: Response) => {
  try {
    const questId = req.params.id;
    const { userId } = req.body;

    // ObjectIdに変換
    const questObjectId = new mongoose.Types.ObjectId(questId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const quest = await Quest.findById(questObjectId);
    const user = await User.findById(userObjectId);

    if (!quest || !user) {
      return res.status(404).json({ message: 'クエストまたはユーザーが見つかりません' });
    }

    if (!quest.participants.some(id => id.toString() === userObjectId.toString())) {
      return res.status(400).json({ message: 'このクエストに参加していません' });
    }

    if (quest.status !== 'in_progress') {
      return res.status(400).json({ message: 'このクエストは進行中ではありません' });
    }

    // 経験値の計算（難易度に応じて）
    const experienceMap = {
      easy: 100,
      medium: 200,
      hard: 300,
    };

    const experience = experienceMap[quest.difficulty];
    user.experience += experience;

    // レベルアップの処理
    const levelThreshold = user.level * 1000;
    if (user.experience >= levelThreshold) {
      user.level += 1;
      user.experience -= levelThreshold;
    }

    quest.status = 'completed';
    await quest.save();
    await user.save();

    res.json({
      message: 'クエストを完了しました',
      experience,
      level: user.level,
      currentExperience: user.experience,
    });
  } catch (error) {
    console.error('Error in completeQuest:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const createQuest = async (req: Request, res: Response) => {
  try {
    const { guildId, title, description, difficulty, timeLimit, reward } = req.body;

    // ObjectIdに変換
    const guildObjectId = new mongoose.Types.ObjectId(guildId);

    const quest = new Quest({
      guildId: guildObjectId,
      title,
      description,
      difficulty,
      timeLimit,
      reward,
      status: 'available',
      participants: []
    });

    await quest.save();
    res.status(201).json(quest);
  } catch (error) {
    console.error('Error in createQuest:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
}; 