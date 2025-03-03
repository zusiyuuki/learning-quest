import { Request, Response, NextFunction } from 'express';

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

export const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.session?.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // ユーザー情報をリクエストオブジェクトに追加
    req.user = {
      id: userId
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: '認証が必要です' });
  }
}; 