import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Guild from '../models/Guild';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // 既存のデータを削除
    await User.deleteMany({});
    await Guild.deleteMany({});
    console.log('Cleared existing data');

    // テストユーザーの作成
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123', // 実際のアプリケーションではハッシュ化する必要があります
      level: 1,
      experience: 0,
      joinedGuilds: [],
    });

    await testUser.save();
    console.log('Test user created successfully');

    // ギルドの作成
    const guilds = [
      {
        name: '数学ギルド',
        description: '数学の問題を解いたり、数学の概念について議論したりするギルドです。',
        icon: '🔢',
        memberCount: 150,
        requirements: ['数学の基礎知識があること', '週1回以上の参加'],
        quests: [
          {
            id: 'math-1',
            title: '初級数学の試練',
            description: '基本的な数学の問題を解いて、理解度を確認しましょう。',
            difficulty: 'easy',
            timeLimit: '2時間',
            reward: '経験値 100',
          },
        ],
      },
      {
        name: '国語ギルド',
        description: '読解力を高め、文章力を磨くためのギルドです。',
        icon: '📚',
        memberCount: 120,
        requirements: ['国語の基礎知識があること', '週1回以上の参加'],
        quests: [
          {
            id: 'jp-1',
            title: '現代文読解入門',
            description: '基本的な読解力を身につけましょう。',
            difficulty: 'easy',
            timeLimit: '1時間',
            reward: '経験値 100',
          },
        ],
      },
      {
        name: '経済ギルド',
        description: '経済学の基礎から応用まで、実践的な知識を身につけるためのギルドです。',
        icon: '💹',
        memberCount: 80,
        requirements: ['経済の基礎知識があること', '週1回以上の参加'],
        quests: [
          {
            id: 'eco-1',
            title: '経済の基礎',
            description: '基本的な経済の仕組みを学びます。',
            difficulty: 'easy',
            timeLimit: '2時間',
            reward: '経験値 100',
          },
        ],
      },
      {
        name: 'プログラミングギルド',
        description: 'プログラミングスキルを向上させ、実践的なプロジェクトに取り組むギルドです。初心者歓迎！',
        icon: '💻',
        memberCount: 200,
        requirements: ['PCを持っていること', 'タイピングができること'],
        quests: [
          {
            id: 'prog-1',
            title: 'プログラミング入門',
            description: '基本的なプログラミングの概念を学びます。',
            difficulty: 'easy',
            timeLimit: '3時間',
            reward: '経験値 150',
          },
        ],
      },
      {
        name: '英語ギルド',
        description: '英語力を向上させるためのギルドです。会話、リーディング、ライティングなど、総合的なスキルアップを目指します。',
        icon: '🌎',
        memberCount: 180,
        requirements: ['アルファベットが読めること', '基本的な単語を知っていること'],
        quests: [
          {
            id: 'eng-1',
            title: '英語の基礎',
            description: '基本的な英語の文法と単語を学びます。',
            difficulty: 'easy',
            timeLimit: '2時間',
            reward: '経験値 120',
          },
        ],
      },
      {
        name: '歴史ギルド',
        description: '世界史や日本史について学び、歴史的な出来事や文化について理解を深めるギルドです。',
        icon: '🏛️',
        memberCount: 90,
        requirements: ['年表が読めること', '歴史に興味があること'],
        quests: [
          {
            id: 'hist-1',
            title: '歴史の基礎',
            description: '基本的な歴史の流れを学びます。',
            difficulty: 'easy',
            timeLimit: '2時間',
            reward: '経験値 100',
          },
        ],
      },
    ];

    for (const guildData of guilds) {
      const guild = new Guild(guildData);
      await guild.save();
      console.log(`Guild "${guildData.name}" created successfully with ID: ${guild._id}`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData(); 