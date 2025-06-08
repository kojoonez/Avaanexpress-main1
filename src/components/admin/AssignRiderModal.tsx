'use client'

import { useState } from 'react'
import { Search, Star, MapPin, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Rider {
  id: string
  name: string
  rating: number
  totalDeliveries: number
  currentLocation: string
  status: 'available' | 'busy' | 'offline'
  distance: string
  estimatedArrival: string
}

interface AssignRiderModalProps {
  orderId: string
  onClose: () => void
  onAssign: (riderId: string) => void
}

export function AssignRiderModal({ orderId, onClose, onAssign }: AssignRiderModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRider, setSelectedRider] = useState<string | null>(null)

  // Mock available riders data - would come from API in production
  const availableRiders: Rider[] = [
    {
      id: 'RIDER001',
      name: 'Mike Smith',
      rating: 4.8,
      totalDeliveries: 156,
      currentLocation: '123 Nearby St',
      status: 'available',
      distance: '0.8 miles away',
      estimatedArrival: '5 mins',
    },
    {
      id: 'RIDER002',
      name: 'Sarah Johnson',
      rating: 4.9,
      totalDeliveries: 243,
      currentLocation: '456 Close Ave',
      status: 'available',
      distance: '1.2 miles away',
      estimatedArrival: '8 mins',
    },
    {
      id: 'RIDER003',
      name: 'David Wilson',
      rating: 4.7,
      totalDeliveries: 89,
      currentLocation: '789 Near Rd',
      status: 'available',
      distance: '1.5 miles away',
      estimatedArrival: '10 mins',
    },
  ]

  // Filter riders based on search query
  const filteredRiders = availableRiders.filter(rider =>
    rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rider.currentLocation.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card-background rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Assign Rider to Order #{orderId}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search riders by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
            />
          </div>

          {/* Riders List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {filteredRiders.map((rider) => (
              <div
                key={rider.id}
                className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedRider === rider.id
                    ? 'border-primary-blue bg-primary-blue/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedRider(rider.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white">{rider.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-400">
                        {rider.rating} ({rider.totalDeliveries} deliveries)
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    rider.status === 'available' ? 'bg-green-500/20 text-green-500' :
                    rider.status === 'busy' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-gray-500/20 text-gray-500'
                  }`}>
                    {rider.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{rider.currentLocation}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{rider.distance}</span>
                    <span>•</span>
                    <span>Est. arrival: {rider.estimatedArrival}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="secondary"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => selectedRider && onAssign(selectedRider)}
              disabled={!selectedRider}
              className="px-4 py-2 bg-primary-blue hover:bg-secondary-blue text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Rider
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 