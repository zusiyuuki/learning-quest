'use client'

import React from 'react'
import { Button } from '../ui/Button'

interface QuestCardProps {
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: string
  reward: string
  isJoined?: boolean
  onJoin?: () => void
  onComplete?: () => void
}

export const QuestCard: React.FC<QuestCardProps> = ({
  title,
  description,
  difficulty,
  timeLimit,
  reward,
  isJoined = false,
  onJoin,
  onComplete,
}) => {
  const difficultyColors = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
  }

  const difficultyText = {
    easy: '初級',
    medium: '中級',
    hard: '上級',
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-amber-400">{title}</h3>
        <span className={`${difficultyColors[difficulty]} font-bold`}>
          {difficultyText[difficulty]}
        </span>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="space-y-2 mb-6">
        <p className="text-gray-400">
          <span className="font-bold">制限時間:</span> {timeLimit}
        </p>
        <p className="text-gray-400">
          <span className="font-bold">報酬:</span> {reward}
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        {isJoined ? (
          <Button onClick={onComplete} variant="primary">
            クエスト完了
          </Button>
        ) : (
          <Button onClick={onJoin} variant="primary">
            クエスト参加
          </Button>
        )}
      </div>
    </div>
  )
} 