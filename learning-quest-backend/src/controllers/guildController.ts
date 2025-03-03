import { Request, Response } from 'express';
import Guild from '../models/Guild';
import User from '../models/User';
import mongoose from 'mongoose';
import Quest, { IQuest } from '../models/Quest';

interface RequestWithSession extends Request {
  session?: {
    user?: {
      id: string;
    };
  };
}

export const getGuilds = async (req: Request, res: Response) => {
  try {
    const guilds = await Guild.find();
    res.json(guilds);
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const getGuildById = async (req: Request, res: Response) => {
  try {
    console.log('Searching for guild with ID or name:', req.params.id);
    
    let guild;
    const searchId = req.params.id;

    // MongoDBのObjectId形式かどうかをチェック
    const isValidObjectId = mongoose.Types.ObjectId.isValid(searchId);

    if (isValidObjectId) {
      guild = await Guild.findById(searchId);
      console.log('Searched by ID:', guild ? 'Found' : 'Not found');
    }

    // IDで見つからない、またはObjectIdでない場合は名前で検索
    if (!guild) {
      guild = await Guild.findOne({ name: searchId });
      console.log('Searched by name:', guild ? 'Found' : 'Not found');
    }

    if (!guild) {
      console.log('Guild not found with ID/name:', searchId);
      return res.status(404).json({ 
        message: 'ギルドが見つかりませんでした',
        searchTerm: searchId
      });
    }

    console.log('Guild found:', {
      id: guild._id,
      name: guild.name,
      questCount: guild.quests?.length
    });

    res.json(guild);
  } catch (error) {
    console.error('ギルドの取得に失敗しました:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    res.status(500).json({ 
      message: 'サーバーエラーが発生しました',
      error: error instanceof Error ? error.message : '不明なエラー'
    });
  }
};

export const createGuild = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, requirements, quests } = req.body;
    const guild = new Guild({
      name,
      description,
      icon,
      requirements,
      quests,
    });
    await guild.save();
    res.status(201).json(guild);
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const joinGuild = async (req: RequestWithSession, res: Response) => {
  try {
    const { guildId } = req.body;
    // 実在するユーザーIDを使用
    const userId = new mongoose.Types.ObjectId("67c51c80004b24adeb839b57");

    console.log('Join request received:', { userId, guildId });

    // ギルドIDをMongoDBのObjectId形式に変換
    let mongoGuildId;
    try {
      mongoGuildId = new mongoose.Types.ObjectId(guildId);
    } catch (error) {
      console.error('Invalid guild ID format:', guildId);
      return res.status(400).json({ 
        message: '無効なギルドID形式です',
        error: 'Invalid guild ID format'
      });
    }

    // ギルドとユーザーを取得
    const guild = await Guild.findById(mongoGuildId);
    const user = await User.findById(userId);

    console.log('Before update - User:', {
      id: user?._id,
      username: user?.username,
      joinedGuilds: user?.joinedGuilds
    });
    console.log('Before update - Guild:', {
      id: guild?._id,
      name: guild?.name,
      members: guild?.members,
      memberCount: guild?.memberCount
    });

    if (!guild || !user) {
      return res.status(404).json({ message: 'ギルドまたはユーザーが見つかりません' });
    }

    // 既に参加しているかチェック
    const isAlreadyJoined = user.joinedGuilds.some((joinedGuildId: mongoose.Types.ObjectId) => 
      joinedGuildId.toString() === mongoGuildId.toString()
    );
    if (isAlreadyJoined) {
      return res.status(400).json({ message: '既にギルドに参加しています' });
    }

    // ギルドに参加
    user.joinedGuilds.push(mongoGuildId);
    guild.members.push(userId);
    guild.memberCount += 1;

    // 変更を保存
    const updatedUser = await user.save();
    const updatedGuild = await guild.save();

    console.log('After update - User:', {
      id: updatedUser._id,
      username: updatedUser.username,
      joinedGuilds: updatedUser.joinedGuilds
    });
    console.log('After update - Guild:', {
      id: updatedGuild._id,
      name: updatedGuild.name,
      members: updatedGuild.members,
      memberCount: updatedGuild.memberCount
    });

    res.json({ 
      message: 'ギルドに参加しました',
      guild: {
        id: updatedGuild._id,
        name: updatedGuild.name,
        memberCount: updatedGuild.memberCount
      }
    });
  } catch (error) {
    console.error('Error in joinGuild:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    res.status(500).json({ 
      message: 'サーバーエラーが発生しました',
      error: error instanceof Error ? error.message : '不明なエラー'
    });
  }
};

export const leaveGuild = async (req: Request, res: Response) => {
  try {
    const { userId, guildId } = req.body;
    const guild = await Guild.findById(guildId);
    const user = await User.findById(userId);

    if (!guild || !user) {
      return res.status(404).json({ message: 'ギルドまたはユーザーが見つかりません' });
    }

    if (!guild.members.includes(userId)) {
      return res.status(400).json({ message: 'このギルドに参加していません' });
    }

    guild.members = guild.members.filter(id => id.toString() !== userId);
    guild.memberCount -= 1;
    user.joinedGuilds = user.joinedGuilds.filter(id => id.toString() !== guildId);

    await guild.save();
    await user.save();

    res.json({ message: 'ギルドから退出しました' });
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
}; 