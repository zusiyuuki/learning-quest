'use client'

import React from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

interface QuestDetailModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: string
  reward: string
  requirements?: string[]
  isJoined?: boolean
}

export const QuestDetailModal: React.FC<QuestDetailModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  difficulty,
  timeLimit,
  reward,
  requirements = [],
  isJoined = false,
}) => {
  const difficultyText = {
    easy: '初級',
    medium: '中級',
    hard: '上級',
  }

  const difficultyColors = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="クエスト詳細">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-amber-400">{title}</h3>
            <span className={`${difficultyColors[difficulty]} font-bold`}>
              {difficultyText[difficulty]}
            </span>
          </div>
          <p className="text-gray-300">{description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-gray-400 mb-2">制限時間</h4>
            <p className="text-gray-300">{timeLimit}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-400 mb-2">報酬</h4>
            <p className="text-gray-300">{reward}</p>
          </div>
          {requirements.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-400 mb-2">
                参加条件
              </h4>
              <ul className="list-disc list-inside text-gray-300">
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="secondary" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={onConfirm}>
            {isJoined ? 'クエストを開始' : 'クエストに参加'}
          </Button>
        </div>
      </div>
    </Modal>
  )
} 