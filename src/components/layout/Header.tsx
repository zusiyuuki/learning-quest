'use client'

import React from 'react'
import Link from 'next/link'

export const Header = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-amber-500 text-xl font-bold">
          Learning Quest
        </Link>
        <div className="flex space-x-4">
          <Link href="/guilds" className="text-white hover:text-amber-500">
            ギルド一覧
          </Link>
          <Link href="/profile" className="text-white hover:text-amber-500">
            プロフィール
          </Link>
        </div>
      </div>
    </nav>
  )
} 