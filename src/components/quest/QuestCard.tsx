'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { QuestDetailModal } from './QuestDetailModal'

interface QuestCardProps {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: string
  reward: string
  requirements?: string[]
  isJoined?: boolean
  onJoin?: () => void
  onComplete?: () => void
  guildId: string
}

export const QuestCard: React.FC<QuestCardProps> = ({
  id,
  title,
  description,
  difficulty,
  timeLimit,
  reward,
  requirements = [],
  isJoined = false,
  onJoin,
  onComplete,
  guildId,
}) => {
  const router = useRouter()
  const [showDetailModal, setShowDetailModal] = useState(false)

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

  const handleQuestStart = () => {
    if (isJoined) {
      // クエストページに遷移
      router.push(`/quests/${id}?guild=${guildId}`)
    } else {
      // 参加確認モーダルを表示
      setShowDetailModal(true)
    }
  }

  const handleJoinQuest = () => {
    onJoin?.()
    setShowDetailModal(false)
  }

  return (
    <>
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
          <Button onClick={handleQuestStart} variant="primary">
            {isJoined ? 'クエスト開始' : 'クエスト詳細'}
          </Button>
        </div>
      </div>

      <QuestDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onConfirm={handleJoinQuest}
        title={title}
        description={description}
        difficulty={difficulty}
        timeLimit={timeLimit}
        reward={reward}
        requirements={requirements}
        isJoined={isJoined}
      />
    </>
  )
} 