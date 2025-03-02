'use client'

import React from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

interface QuestResultModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  isSuccess: boolean
  earnedExp: number
  nextRankProgress?: {
    current: number
    next: number
  }
  rewards?: string[]
  feedback?: string
}

export const QuestResultModal: React.FC<QuestResultModalProps> = ({
  isOpen,
  onClose,
  title,
  isSuccess,
  earnedExp,
  nextRankProgress,
  rewards = [],
  feedback,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSuccess ? 'クエスト完了！' : 'クエスト失敗...'}
    >
      <div className="space-y-6">
        <div
          className={`text-center p-6 rounded-lg ${
            isSuccess ? 'bg-green-900/50' : 'bg-red-900/50'
          }`}
        >
          <div className="text-4xl mb-4">{isSuccess ? '🎉' : '😢'}</div>
          <h3 className="text-xl font-bold text-amber-400 mb-2">{title}</h3>
          <p className={`text-lg ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {isSuccess ? 'クリア成功！' : '残念...'}
          </p>
        </div>

        {isSuccess && (
          <>
            <div>
              <h4 className="text-sm font-bold text-gray-400 mb-2">獲得経験値</h4>
              <p className="text-2xl font-bold text-amber-400">+{earnedExp} EXP</p>
            </div>

            {nextRankProgress && (
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-2">
                  次のランクまで
                </h4>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-amber-400">
                        {nextRankProgress.current}/{nextRankProgress.next} EXP
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                    <div
                      style={{
                        width: `${
                          (nextRankProgress.current / nextRankProgress.next) * 100
                        }%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {rewards.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-2">獲得報酬</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {rewards.map((reward, index) => (
                    <li key={index}>{reward}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {feedback && (
          <div>
            <h4 className="text-sm font-bold text-gray-400 mb-2">フィードバック</h4>
            <p className="text-gray-300">{feedback}</p>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-8">
          <Button onClick={onClose}>閉じる</Button>
        </div>
      </div>
    </Modal>
  )
} 