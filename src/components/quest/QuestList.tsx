'use client'

import React from 'react'
import { QuestCard } from './QuestCard'

interface Quest {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: string
  reward: string
  isJoined?: boolean
}

interface QuestListProps {
  quests: Quest[]
  onJoinQuest: (questId: string) => void
  onCompleteQuest: (questId: string) => void
}

export const QuestList: React.FC<QuestListProps> = ({
  quests,
  onJoinQuest,
  onCompleteQuest,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {quests.map((quest) => (
        <QuestCard
          key={quest.id}
          {...quest}
          onJoin={() => onJoinQuest(quest.id)}
          onComplete={() => onCompleteQuest(quest.id)}
        />
      ))}
    </div>
  )
} 