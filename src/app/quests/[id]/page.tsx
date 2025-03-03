'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { QuestResultModal } from '@/components/quest/QuestResultModal'

interface Question {
  id: string
  question: string
  options?: string[]
  type: 'multiple-choice' | 'text'
  correctAnswer: string | number
}

const MOCK_QUEST = {
  id: '1',
  title: '初級数学の試練',
  description: '基本的な数学の問題を解いて、理解度を確認しましょう。',
  difficulty: 'easy' as const,
  timeLimit: '2時間',
  reward: '経験値 100',
  questions: [
    {
      id: '1',
      question: '次の計算をしなさい: 12 + 8 × 2',
      options: ['28', '32', '40', '20'],
      type: 'multiple-choice',
      correctAnswer: 0,
    },
    {
      id: '2',
      question: '次の計算をしなさい: (15 + 5) ÷ 4',
      options: ['3', '4', '5', '6'],
      type: 'multiple-choice',
      correctAnswer: 2,
    },
    {
      id: '3',
      question: '次の数を漢数字で書きなさい: 48',
      type: 'text',
      correctAnswer: '四十八',
    },
  ] as Question[],
}

export default function QuestPage({ params }: { params: { id: string } }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(string | number)[]>([])
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | number>('')

  const currentQuestion = MOCK_QUEST.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === MOCK_QUEST.questions.length - 1

  const handleAnswer = () => {
    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)

    if (isLastQuestion) {
      // 全問終了時の処理
      const correctCount = newAnswers.filter(
        (answer, index) =>
          answer === MOCK_QUEST.questions[index].correctAnswer
      ).length
      setShowResult(true)
    } else {
      // 次の問題へ
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption('')
    }
  }

  const handleOptionSelect = (option: string | number) => {
    setSelectedOption(option)
  }

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href={`/guilds/${params.id}`}>
            <Button variant="secondary">← ギルドに戻る</Button>
          </Link>
          <div className="text-gray-300">
            問題 {currentQuestionIndex + 1} / {MOCK_QUEST.questions.length}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-amber-400 mb-8">
            {MOCK_QUEST.title}
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-300 mb-4">
                {currentQuestion.question}
              </h2>

              {currentQuestion.type === 'multiple-choice' ? (
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      className={`p-4 rounded-lg text-left transition-colors ${
                        selectedOption === index
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  className="w-full p-4 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="回答を入力してください"
                  value={selectedOption as string}
                  onChange={(e) => handleOptionSelect(e.target.value)}
                />
              )}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleAnswer}
                disabled={selectedOption === ''}
              >
                {isLastQuestion ? '回答を終了' : '次の問題へ'}
              </Button>
            </div>
          </div>
        </div>

        <QuestResultModal
          isOpen={showResult}
          onClose={() => setShowResult(false)}
          title={MOCK_QUEST.title}
          isSuccess={true}
          earnedExp={100}
          nextRankProgress={{
            current: 250,
            next: 500,
          }}
          rewards={['数学の基礎バッジ', 'ボーナス経験値 +20']}
          feedback="基本的な計算問題をしっかりと解くことができました！"
        />
      </div>
    </main>
  )
} 