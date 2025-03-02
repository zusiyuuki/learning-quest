'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

interface GuildCardProps {
  id: string
  name: string
  description: string
  icon: string
  memberCount: number
  isJoined?: boolean
  onJoin?: () => void
}

export const GuildCard: React.FC<GuildCardProps> = ({
  id,
  name,
  description,
  icon,
  memberCount,
  isJoined = false,
  onJoin,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleJoin = () => {
    onJoin?.()
    setIsModalOpen(false)
  }

  return (
    <>
      <div
        className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center mb-4">
          <div className="text-4xl mr-4">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-amber-400">{name}</h3>
            <p className="text-gray-400">メンバー: {memberCount}人</p>
          </div>
        </div>
        <p className="text-gray-300 line-clamp-2">{description}</p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${name}の詳細`}
      >
        <div className="space-y-4">
          <div className="flex items-center mb-6">
            <div className="text-5xl mr-4">{icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-amber-400">{name}</h3>
              <p className="text-gray-400">メンバー: {memberCount}人</p>
            </div>
          </div>
          <p className="text-gray-300">{description}</p>
          <div className="flex justify-end space-x-4 mt-6">
            {isJoined ? (
              <Link href={`/guilds/${id}`}>
                <Button>ギルドページへ</Button>
              </Link>
            ) : (
              <>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  閉じる
                </Button>
                <Button onClick={handleJoin}>参加する</Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
} 