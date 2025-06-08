'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

type DemandLevel = 'high' | 'medium' | 'low'

interface DemandIndicatorProps {
  level: DemandLevel
}

const demandConfig = {
  high: {
    text: 'High Demand',
    color: 'text-green-500',
    icon: TrendingUp,
    description: 'Many delivery requests in your area'
  },
  medium: {
    text: 'Medium Demand',
    color: 'text-yellow-500',
    icon: Minus,
    description: 'Steady delivery requests in your area'
  },
  low: {
    text: 'Low Demand',
    color: 'text-red-500',
    icon: TrendingDown,
    description: 'Few delivery requests in your area'
  }
}

export function DemandIndicator({ level }: DemandIndicatorProps) {
  const { text, color, icon: Icon, description } = demandConfig[level]

  return (
    <div className="bg-card-background rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Icon className={`${color} w-6 h-6`} />
        <div>
          <h3 className={`font-semibold ${color}`}>{text}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
} 