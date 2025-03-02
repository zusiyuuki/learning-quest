'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface GuildRank {
  guildId: string
  guildName: string
  icon: string
  currentRank: number
  maxRank: number
  exp: number
  nextRankExp: number
}

interface QuestHistory {
  id: string
  title: string
  guildName: string
  status: 'completed' | 'failed'
  completedAt: string
}

const GUILD_RANKS: GuildRank[] = [
  {
    guildId: 'math',
    guildName: '数学ギルド',
    icon: '🔢',
    currentRank: 2,
    maxRank: 10,
    exp: 150,
    nextRankExp: 300,
  },
  {
    guildId: 'programming',
    guildName: 'プログラミングギルド',
    icon: '💻',
    currentRank: 1,
    maxRank: 10,
    exp: 50,
    nextRankExp: 100,
  },
]

const QUEST_HISTORY: QuestHistory[] = [
  {
    id: 'math-1',
    title: '初級数学の試練',
    guildName: '数学ギルド',
    status: 'completed',
    completedAt: '2024-03-01',
  },
  {
    id: 'programming-1',
    title: 'Hello World!',
    guildName: 'プログラミングギルド',
    status: 'completed',
    completedAt: '2024-02-28',
  },
]

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* プロフィールヘッダー */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-amber-500 mb-2">
                ユーザー名
              </h1>
              <p className="text-gray-300">冒険者ランク: 2</p>
            </div>
          </div>
        </div>

        {/* ギルドランク一覧 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-amber-500 mb-6">
            所属ギルドとランク
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GUILD_RANKS.map((guild) => (
              <div key={guild.guildId} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{guild.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-400">
                      {guild.guildName}
                    </h3>
                    <p className="text-gray-300">
                      ランク: {guild.currentRank}/{guild.maxRank}
                    </p>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-amber-400">
                        経験値: {guild.exp}/{guild.nextRankExp}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                    <div
                      style={{
                        width: `${(guild.exp / guild.nextRankExp) * 100}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"
                    />
                  </div>
                  <Link href={`/guilds/${guild.guildId}`}>
                    <Button className="w-full">ギルドページへ</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* クエスト履歴 */}
        <section>
          <h2 className="text-2xl font-bold text-amber-500 mb-6">
            クエスト履歴
          </h2>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    クエスト名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    ギルド
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    状態
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    完了日
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {QUEST_HISTORY.map((quest) => (
                  <tr key={quest.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-amber-400">
                      {quest.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {quest.guildName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          quest.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {quest.status === 'completed' ? '完了' : '失敗'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {quest.completedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
} 