'use client'

import { useState } from 'react'
import {
  DollarSign,
  Clock,
  TrendingUp,
  Package,
  Star
} from 'lucide-react'

const timeRanges = ['Today', 'This Week', 'This Month', 'Last Month']

const deliveries = [
  {
    id: 1,
    date: '2024-05-24',
    time: '14:30',
    amount: 12.50,
    tip: 3.00,
    boost: 1.2,
    customer: 'John D.',
    rating: 5,
    items: 3
  },
  {
    id: 2,
    date: '2024-05-24',
    time: '13:15',
    amount: 15.75,
    tip: 4.50,
    boost: 1.5,
    customer: 'Sarah M.',
    rating: 5,
    items: 2
  },
  {
    id: 3,
    date: '2024-05-24',
    time: '12:00',
    amount: 8.25,
    tip: 2.00,
    boost: 1.0,
    customer: 'Mike R.',
    rating: 4,
    items: 1
  }
]

export default function EarningsPage() {
  const [selectedRange, setSelectedRange] = useState('Today')
  const totalEarnings = deliveries.reduce((sum, del) => sum + del.amount + del.tip, 0)
  const totalDeliveries = deliveries.length
  const averageRating = deliveries.reduce((sum, del) => sum + del.rating, 0) / deliveries.length

  return (
    <div className="px-4 py-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-1">Earnings</h1>
        <p className="text-gray-400 text-sm">
          Track your earnings, tips, and delivery performance
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto -mx-4 px-4 pb-2">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)}
            className={`min-w-[5.5rem] px-4 py-3 rounded-lg transition-colors text-center ${
              selectedRange === range
                ? 'bg-primary-blue text-white'
                : 'bg-card-background text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-card-background border border-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-400 mb-1 text-sm">
            <DollarSign size={14} />
            <span>Total Earnings</span>
          </div>
          <div className="text-xl font-bold">${totalEarnings.toFixed(2)}</div>
        </div>

        <div className="bg-card-background border border-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-400 mb-1 text-sm">
            <Package size={14} />
            <span>Deliveries</span>
          </div>
          <div className="text-xl font-bold">{totalDeliveries}</div>
        </div>

        <div className="col-span-2 bg-card-background border border-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-400 mb-1 text-sm">
            <Star size={14} />
            <span>Average Rating</span>
          </div>
          <div className="text-xl font-bold">{averageRating.toFixed(1)}</div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold mb-3">Recent Deliveries</h2>
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="bg-card-background border border-gray-800 rounded-lg p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock size={14} />
                <span>{delivery.time}</span>
                <Package size={14} className="ml-1" />
                <span>{delivery.items} items</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} className="fill-current" />
                  <span className="text-sm">{delivery.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-primary-blue">
                  <TrendingUp size={14} />
                  <span className="text-sm">{delivery.boost}x</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{delivery.customer}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">
                  ${delivery.amount.toFixed(2)} + ${delivery.tip.toFixed(2)}
                </span>
                <span className="font-semibold">
                  ${(delivery.amount + delivery.tip).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 