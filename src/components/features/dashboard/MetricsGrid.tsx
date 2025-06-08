'use client'

import { 
  Users, 
  ShoppingBag, 
  Bike, 
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react'

const metrics = [
  {
    title: 'Total Users',
    value: '24,521',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Active Orders',
    value: '145',
    change: '+5%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'bg-green-500'
  },
  {
    title: 'Available Riders',
    value: '89',
    change: '-3%',
    trend: 'down',
    icon: Bike,
    color: 'bg-yellow-500'
  },
  {
    title: 'Daily Revenue',
    value: '$12,489',
    change: '+18%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-purple-500'
  }
]

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <div
            key={metric.title}
            className="bg-card-background rounded-lg p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} p-3 rounded-lg`}>
                <Icon size={24} className="text-white" />
              </div>
              <div className={`flex items-center gap-1 ${
                metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                <TrendingUp size={16} />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{metric.title}</h3>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-1 mt-2 text-gray-400 text-sm">
              <Clock size={14} />
              <span>Last hour</span>
            </div>
          </div>
        )
      })}
    </div>
  )
} 