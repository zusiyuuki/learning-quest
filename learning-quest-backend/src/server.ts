import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import guildRoutes from './routes/guildRoutes';
import questRoutes from './routes/questRoutes';

dotenv.config();

const app = express();

// CORSの設定
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// ルート
app.use('/api/users', userRoutes);
app.use('/api/guilds', guildRoutes);
app.use('/api/quests', questRoutes);

// データベース接続
connectDB();

// サーバー起動
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 