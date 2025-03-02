'use client'

import React from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

interface GuildJoinModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  name: string
  description: string
  icon: string
  memberCount: number
  requirements?: string[]
}

export const GuildJoinModal: React.FC<GuildJoinModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  name,
  description,
  icon,
  memberCount,
  requirements = [],
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ギルドに参加">
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="text-5xl mr-4">{icon}</div>
          <div>
            <h3 className="text-2xl font-bold text-amber-400">{name}</h3>
            <p className="text-gray-400">メンバー: {memberCount}人</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-400 mb-2">ギルド説明</h4>
          <p className="text-gray-300">{description}</p>
        </div>

        {requirements.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-400 mb-2">参加条件</h4>
            <ul className="list-disc list-inside text-gray-300">
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <h4 className="text-sm font-bold text-amber-400 mb-2">
            参加するとできること
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center">
              <span className="mr-2">✨</span>
              ギルド専用のクエストに挑戦できます
            </li>
            <li className="flex items-center">
              <span className="mr-2">💬</span>
              メンバーとチャットで交流できます
            </li>
            <li className="flex items-center">
              <span className="mr-2">📈</span>
              ギルドランクを上げて特典を獲得できます
            </li>
          </ul>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="secondary" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={onConfirm}>ギルドに参加</Button>
        </div>
      </div>
    </Modal>
  )
} 