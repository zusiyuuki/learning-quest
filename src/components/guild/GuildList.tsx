'use client'

import React from 'react'
import { GuildCard } from './GuildCard'

interface Guild {
  id: string
  name: string
  description: string
  icon: string
  memberCount: number
  isJoined?: boolean
}

interface GuildListProps {
  guilds: Guild[]
  onJoinGuild: (guildId: string) => void
}

export const GuildList: React.FC<GuildListProps> = ({ guilds, onJoinGuild }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guilds.map((guild) => (
        <GuildCard
          key={guild.id}
          {...guild}
          onJoin={() => onJoinGuild(guild.id)}
        />
      ))}
    </div>
  )
} 