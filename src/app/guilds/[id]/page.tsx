'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { QuestList } from '@/components/quest/QuestList'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'

// ギルドのモックデータ
const GUILD_DATA = {
  math: {
    id: 'math',
    name: '数学ギルド',
    description: '数学の問題を解いたり、数学の概念について議論したりするギルドです。初心者から上級者まで、みんなで学び合える環境を目指しています。',
    icon: '🔢',
    memberCount: 150,
    quests: [
      {
        id: 'math-1',
        title: '初級数学の試練',
        description: '基本的な数学の問題を解いて、理解度を確認しましょう。',
        difficulty: 'easy' as const,
        timeLimit: '2時間',
        reward: '経験値 100',
      },
      {
        id: 'math-2',
        title: '中級数学への挑戦',
        description: '少し難しい数学の問題に挑戦してみましょう。',
        difficulty: 'medium' as const,
        timeLimit: '3時間',
        reward: '経験値 200',
      },
      {
        id: 'math-3',
        title: '上級数学マスター',
        description: '高度な数学の問題を解いて、実力を証明しましょう。',
        difficulty: 'hard' as const,
        timeLimit: '4時間',
        reward: '経験値 300',
      },
    ],
  },
  programming: {
    id: 'programming',
    name: 'プログラミングギルド',
    description: 'プログラミングスキルを向上させ、実践的なプロジェクトに取り組むギルドです。初心者歓迎！',
    icon: '💻',
    memberCount: 200,
    quests: [
      {
        id: 'prog-1',
        title: 'Hello, World!',
        description: 'プログラミングの第一歩！基本的な文法を学びましょう。',
        difficulty: 'easy' as const,
        timeLimit: '1時間',
        reward: '経験値 100',
      },
      {
        id: 'prog-2',
        title: '関数とオブジェクト',
        description: 'プログラミングの重要な概念を学びましょう。',
        difficulty: 'medium' as const,
        timeLimit: '3時間',
        reward: '経験値 200',
      },
      {
        id: 'prog-3',
        title: 'ミニプロジェクト開発',
        description: '簡単なアプリケーションを作成してみましょう。',
        difficulty: 'hard' as const,
        timeLimit: '5時間',
        reward: '経験値 300',
      },
    ],
  },
  english: {
    id: 'english',
    name: '英語ギルド',
    description: '英語力を向上させるためのギルドです。会話、リーディング、ライティングなど、総合的なスキルアップを目指します。',
    icon: '🌎',
    memberCount: 180,
    quests: [
      {
        id: 'eng-1',
        title: '基礎英会話',
        description: '日常会話で使える基本的なフレーズを学びましょう。',
        difficulty: 'easy' as const,
        timeLimit: '1時間',
        reward: '経験値 100',
      },
      {
        id: 'eng-2',
        title: 'ビジネス英語',
        description: 'ビジネスシーンで使える英語を学びましょう。',
        difficulty: 'medium' as const,
        timeLimit: '2時間',
        reward: '経験値 200',
      },
      {
        id: 'eng-3',
        title: 'プレゼンテーション',
        description: '英語でプレゼンテーションを行う練習をしましょう。',
        difficulty: 'hard' as const,
        timeLimit: '3時間',
        reward: '経験値 300',
      },
    ],
  },
  japanese: {
    id: 'japanese',
    name: '国語ギルド',
    description: '読解力を高め、文章力を磨くためのギルドです。古典から現代文まで、幅広い分野を扱います。',
    icon: '📚',
    memberCount: 120,
    quests: [
      {
        id: 'jp-1',
        title: '現代文読解入門',
        description: '基本的な読解力を身につけましょう。',
        difficulty: 'easy' as const,
        timeLimit: '1時間',
        reward: '経験値 100',
      },
      {
        id: 'jp-2',
        title: '古文の基礎',
        description: '古文の基本的な文法と単語を学びます。',
        difficulty: 'medium' as const,
        timeLimit: '2時間',
        reward: '経験値 200',
      },
      {
        id: 'jp-3',
        title: '小論文作成',
        description: '論理的な文章の書き方を学びます。',
        difficulty: 'hard' as const,
        timeLimit: '3時間',
        reward: '経験値 300',
      },
    ],
  },
  history: {
    id: 'history',
    name: '歴史ギルド',
    description: '世界史や日本史について学び、歴史的な出来事や文化について理解を深めるギルドです。',
    icon: '🏛️',
    memberCount: 90,
    quests: [
      {
        id: 'his-1',
        title: '日本史基礎',
        description: '日本の主要な歴史的出来事を学びます。',
        difficulty: 'easy' as const,
        timeLimit: '2時間',
        reward: '経験値 100',
      },
      {
        id: 'his-2',
        title: '世界史探究',
        description: '世界の重要な歴史的事象を学びます。',
        difficulty: 'medium' as const,
        timeLimit: '3時間',
        reward: '経験値 200',
      },
      {
        id: 'his-3',
        title: '文化史研究',
        description: '様々な時代の文化や芸術について学びます。',
        difficulty: 'hard' as const,
        timeLimit: '4時間',
        reward: '経験値 300',
      },
    ],
  },
  economics: {
    id: 'economics',
    name: '経済ギルド',
    description: '経済学の基礎から応用まで、実践的な知識を身につけるためのギルドです。',
    icon: '💹',
    memberCount: 80,
    quests: [
      {
        id: 'eco-1',
        title: '経済の基礎',
        description: '基本的な経済の仕組みを学びます。',
        difficulty: 'easy' as const,
        timeLimit: '2時間',
        reward: '経験値 100',
      },
      {
        id: 'eco-2',
        title: '投資の基本',
        description: '投資の基本的な考え方を学びます。',
        difficulty: 'medium' as const,
        timeLimit: '3時間',
        reward: '経験値 200',
      },
      {
        id: 'eco-3',
        title: 'マーケット分析',
        description: '市場分析の手法を学びます。',
        difficulty: 'hard' as const,
        timeLimit: '4時間',
        reward: '経験値 300',
      },
    ],
  },
}

interface GuildPageProps {
  params: {
    id: string
  }
}

export default function GuildPage({ params }: GuildPageProps) {
  const [activeTab, setActiveTab] = useState<'quests' | 'chat'>('quests')
  const guild = GUILD_DATA[params.id as keyof typeof GUILD_DATA]

  if (!guild) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-amber-500 mb-8">
            ギルドが見つかりません
          </h1>
          <Link href="/guilds">
            <Button>ギルド一覧に戻る</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleJoinQuest = (questId: string) => {
    // TODO: クエスト参加の処理を実装
    console.log(`Joining quest: ${questId}`)
  }

  const handleCompleteQuest = (questId: string) => {
    // TODO: クエスト完了の処理を実装
    console.log(`Completing quest: ${questId}`)
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <Header />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="text-6xl mr-6">{guild.icon}</div>
            <div>
              <h1 className="text-4xl font-bold text-amber-500">{guild.name}</h1>
              <p className="text-gray-400 mt-2">メンバー: {guild.memberCount}人</p>
            </div>
          </div>
          <p className="text-gray-300 mb-12">{guild.description}</p>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === 'quests'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('quests')}
              >
                クエスト
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === 'chat'
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('chat')}
              >
                チャット
              </button>
            </div>

            {activeTab === 'quests' && (
              <QuestList
                quests={guild.quests}
                onJoinQuest={handleJoinQuest}
                onCompleteQuest={handleCompleteQuest}
              />
            )}

            {activeTab === 'chat' && (
              <div className="text-gray-400 text-center py-12">
                チャット機能は開発中です...
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 