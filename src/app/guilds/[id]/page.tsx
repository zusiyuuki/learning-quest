'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { QuestList } from '@/components/quest/QuestList'
import { Button } from '@/components/ui/Button'

const MOCK_QUESTS = [
  {
    id: '1',
    title: '初級数学の試練',
    description: '基本的な数学の問題を解いて、理解度を確認しましょう。',
    difficulty: 'easy' as const,
    timeLimit: '2時間',
    reward: '経験値 100',
  },
  {
    id: '2',
    title: '中級数学への挑戦',
    description: '少し難しい数学の問題に挑戦してみましょう。',
    difficulty: 'medium' as const,
    timeLimit: '3時間',
    reward: '経験値 200',
  },
  {
    id: '3',
    title: '上級数学マスター',
    description: '高度な数学の問題を解いて、実力を証明しましょう。',
    difficulty: 'hard' as const,
    timeLimit: '4時間',
    reward: '経験値 300',
  },
]

export default function GuildPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'quests' | 'chat'>('quests')

  const handleJoinQuest = (questId: string) => {
    // TODO: クエスト参加の処理を実装
    console.log(`Joining quest: ${questId}`)
  }

  const handleCompleteQuest = (questId: string) => {
    // TODO: クエスト完了の処理を実装
    console.log(`Completing quest: ${questId}`)
  }

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/guilds">
              <Button variant="secondary">← ギルド一覧に戻る</Button>
            </Link>
            <h1 className="text-4xl font-bold text-amber-500 ml-8">
              数学ギルド
            </h1>
          </div>
          <div className="text-5xl">🔢</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">ギルド情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300 mb-4">
                数学の問題を解いたり、数学の概念について議論したりするギルドです。
                初心者から上級者まで、みんなで学び合える環境を目指しています。
              </p>
              <p className="text-gray-400">メンバー数: 150人</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-2">
                あなたの状態
              </h3>
              <p className="text-gray-400 mb-2">ギルドランク: 2</p>
              <p className="text-gray-400 mb-2">経験値: 150/300</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-amber-500 rounded-full h-2"
                  style={{ width: '50%' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                activeTab === 'quests'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('quests')}
            >
              クエスト
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                activeTab === 'chat'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('chat')}
            >
              チャット
            </button>
          </div>

          {activeTab === 'quests' ? (
            <QuestList
              quests={MOCK_QUESTS}
              onJoinQuest={handleJoinQuest}
              onCompleteQuest={handleCompleteQuest}
            />
          ) : (
            <div className="text-gray-300">
              <p>チャット機能は開発中です...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 