'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, TrendingUp, Clock, Power } from 'lucide-react'

// Import map component dynamically to avoid SSR issues
const Map = dynamic(() => import('@/components/features/rider/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] bg-gray-900 animate-pulse flex items-center justify-center">
      <span className="text-gray-600">Loading map...</span>
    </div>
  ),
})

export default function RiderPage() {
  const [isOnline, setIsOnline] = useState(false)
  const [currentDemand, setCurrentDemand] = useState(0.8)

  return (
    <main className="min-h-screen bg-background relative">
      {/* Map View */}
      <div className="h-[60vh] w-full">
        <Map />
      </div>

      {/* Status Panel */}
      <div className="bg-card-background border-t border-gray-800">
        <div className="p-4 space-y-4">
          {/* Demand Status */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold mb-1">Quieter than usual</h2>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin size={14} className="mr-1" />
                <span>Current area</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary-blue mb-1">
                {currentDemand.toFixed(1)}x
              </div>
              <div className="flex items-center text-gray-400 text-xs">
                <TrendingUp size={12} className="mr-1" />
                <span>Delivery demand</span>
              </div>
            </div>
          </div>

          {/* Boost Status */}
          <div className="flex items-center justify-between py-3 px-3 bg-background/50 rounded-lg">
            <div className="flex items-center text-gray-400 text-sm">
              <Clock size={16} className="mr-2" />
              <span>No upcoming boosts</span>
            </div>
            <button className="text-primary-blue text-sm hover:text-primary-blue/80">
              View schedule
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
              isOnline
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-primary-blue hover:bg-primary-blue/90'
            }`}
          >
            <Power size={18} />
            <span>{isOnline ? 'Go offline' : 'Go online'}</span>
          </button>
        </div>
      </div>
    </main>
  )
} 