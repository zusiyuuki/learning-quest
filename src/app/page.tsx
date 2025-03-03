'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold text-amber-500 mb-8">
          Learning Quest
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          ゲーム感覚で楽しく学習！ギルドに参加して、クエストをクリアしながら
          知識とスキルを身につけましょう。
        </p>
        <div className="space-y-4">
          <Link href="/guilds">
            <Button size="lg" className="w-full md:w-auto md:min-w-[200px]">
              ギルドを探す
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/profile">
              <Button
                variant="secondary"
                size="lg"
                className="w-full md:w-auto md:min-w-[200px]"
              >
                プロフィール
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-500 text-center mb-12">
          特徴
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-amber-400 mb-2">
              ゲーム感覚で学習
            </h3>
            <p className="text-gray-300">
              クエストをクリアしながら、楽しく効率的に学習を進めることができます。
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-amber-400 mb-2">
              コミュニティ学習
            </h3>
            <p className="text-gray-300">
              同じ目標を持つ仲間と一緒に学習することで、モチベーションを維持できます。
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-amber-400 mb-2">
              成長の可視化
            </h3>
            <p className="text-gray-300">
              経験値やランクで学習の進捗を可視化し、達成感を得ることができます。
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
