'use client'

import { DemandIndicator } from './DemandIndicator'
import { Button } from '../ui/Button'
import { Clock, Zap } from 'lucide-react'

export function StatusPanel() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm rounded-t-2xl p-4 shadow-lg">
      <div className="max-w-md mx-auto space-y-4">
        <DemandIndicator level="high" />
        
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Best time to go online</span>
        </div>

        <div className="bg-card-background rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-500 w-5 h-5" />
            <div>
              <h4 className="font-medium text-white">Boost Available</h4>
              <p className="text-sm text-gray-400">Earn 1.2x more during peak hours</p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-primary-blue hover:bg-secondary-blue text-white font-semibold py-3 rounded-lg">
          Go Online
        </Button>
      </div>
    </div>
  )
} 