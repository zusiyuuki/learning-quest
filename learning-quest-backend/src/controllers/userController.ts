import { Request, Response } from 'express';
import User from '../models/User';
import Guild from '../models/Guild';

interface RequestWithUser extends Request {
  user?: {
    id: string;
  };
  session?: {
    user?: {
      id: string;
    };
  };
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password, // 注意: 実際の実装ではパスワードをハッシュ化する必要があります
    });
    await user.save();
    res.status(201).json({ message: 'ユーザーが作成されました' });
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, level, experience } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, level, experience },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    res.json({ message: 'ユーザーが削除されました' });
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

export const getCurrentUser = async (req: RequestWithUser, res: Response) => {
  try {
    // セッションからユーザーIDを取得
    const userId = req.session?.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: '認証されていません' });
    }

    // ユーザー情報を取得
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    // パスワードを除外してユーザー情報を返す
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      level: user.level,
      experience: user.experience,
      joinedGuilds: user.joinedGuilds
    };

    res.json(userData);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

// ユーザーの所属ギルド情報を取得
export const getUserGuilds = async (req: RequestWithUser, res: Response) => {
  try {
    // 固定のユーザーIDを使用
    const userId = "67c51c80004b24adeb839b57";
    console.log('Fetching user with ID:', userId);

    const user = await User.findById(userId).populate('joinedGuilds');
    if (!user) {
      console.log('User not found with ID:', userId);
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    console.log('Found user:', user);
    console.log('Joined guilds:', user.joinedGuilds);

    // ギルドごとの詳細情報（ランクや経験値など）を取得
    const guildsWithDetails = await Promise.all(
      user.joinedGuilds.map(async (guildId) => {
        console.log('Fetching guild details for:', guildId);
        const guild = await Guild.findById(guildId);
        if (!guild) {
          console.log('Guild not found:', guildId);
          return null;
        }

        console.log('Found guild:', guild);
        return {
          _id: guild._id,
          name: guild.name,
          icon: guild.icon,
          currentRank: 1, // 仮の値（後で実装）
          maxRank: 10,
          exp: 0, // 仮の値（後で実装）
          nextRankExp: 100 // 仮の値（後で実装）
        };
      })
    );

    // nullを除外
    const validGuilds = guildsWithDetails.filter((guild): guild is NonNullable<typeof guild> => guild !== null);
    console.log('Returning guilds:', validGuilds);

    return res.json(validGuilds);
  } catch (error) {
    console.error('Error in getUserGuilds:', error);
    return res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
}; 