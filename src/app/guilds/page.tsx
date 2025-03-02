'use client'

import React from 'react'
import { GuildList } from '@/components/guild/GuildList'

const INITIAL_GUILDS = [
  {
    id: 'math',
    name: '数学ギルド',
    description: '数学の問題を解いたり、数学の概念について議論したりするギルドです。初心者から上級者まで、みんなで学び合える環境を目指しています。',
    icon: '🔢',
    memberCount: 150,
  },
  {
    id: 'japanese',
    name: '国語ギルド',
    description: '読解力を高め、文章力を磨くためのギルドです。古典から現代文まで、幅広い分野を扱います。',
    icon: '📚',
    memberCount: 120,
  },
  {
    id: 'history',
    name: '歴史ギルド',
    description: '世界史や日本史について学び、歴史的な出来事や文化について理解を深めるギルドです。',
    icon: '🏛️',
    memberCount: 90,
  },
  {
    id: 'economics',
    name: '経済ギルド',
    description: '経済学の基礎から応用まで、実践的な知識を身につけるためのギルドです。',
    icon: '💹',
    memberCount: 80,
  },
  {
    id: 'programming',
    name: 'プログラミングギルド',
    description: 'プログラミングスキルを向上させ、実践的なプロジェクトに取り組むギルドです。初心者歓迎！',
    icon: '💻',
    memberCount: 200,
  },
  {
    id: 'english',
    name: '英語ギルド',
    description: '英語力を向上させるためのギルドです。会話、リーディング、ライティングなど、総合的なスキルアップを目指します。',
    icon: '🌎',
    memberCount: 180,
  },
]

export default function GuildsPage() {
  const handleJoinGuild = (guildId: string) => {
    // TODO: ギルド参加の処理を実装
    console.log(`Joining guild: ${guildId}`)
  }

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-500 mb-8">ギルド一覧</h1>
        <p className="text-gray-300 mb-12">
          興味のあるギルドに参加して、仲間と一緒に学習を進めましょう！
        </p>
        <GuildList guilds={INITIAL_GUILDS} onJoinGuild={handleJoinGuild} />
      </div>
    </main>
  )
} 