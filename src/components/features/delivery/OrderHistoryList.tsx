'use client'

import { Package, MapPin, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// This would come from your API in a real application
const mockOrders = [
  {
    id: 'DEL-12345',
    status: 'completed',
    date: '2024-03-20',
    time: '11:45 AM',
    pickup: '123 Pickup St, City',
    dropoff: '456 Delivery Ave, City',
    package: {
      size: 'Medium',
      description: 'Electronics package'
    },
    price: 25.99
  },
  {
    id: 'DEL-12346',
    status: 'in_transit',
    date: '2024-03-20',
    time: '10:30 AM',
    pickup: '789 Start St, City',
    dropoff: '321 End Ave, City',
    package: {
      size: 'Large',
      description: 'Furniture items'
    },
    price: 45.99
  },
  {
    id: 'DEL-12347',
    status: 'cancelled',
    date: '2024-03-19',
    time: '3:15 PM',
    pickup: '567 Origin St, City',
    dropoff: '890 Destination Ave, City',
    package: {
      size: 'Small',
      description: 'Documents'
    },
    price: 15.99
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-500'
    case 'in_transit':
      return 'bg-blue-500/10 text-primary-blue'
    case 'cancelled':
      return 'bg-red-500/10 text-red-500'
    default:
      return 'bg-gray-500/10 text-gray-500'
  }
}

const formatStatus = (status: string) => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

export default function OrderHistoryList() {
  return (
    <div className="space-y-4">
      {mockOrders.map((order) => (
        <Link
          key={order.id}
          href={`/delivery/track?id=${order.id}`}
          className="block bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <Package className="text-primary-blue" size={24} />
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-400">
                    <Clock className="inline-block w-4 h-4 mr-1" />
                    {order.date} at {order.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {formatStatus(order.status)}
                </span>
                <span className="font-medium">${order.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 text-primary-blue" />
                <div>
                  <p className="text-sm text-gray-400">Pickup</p>
                  <p className="font-medium">{order.pickup}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 text-primary-blue" />
                <div>
                  <p className="text-sm text-gray-400">Dropoff</p>
                  <p className="font-medium">{order.dropoff}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
              <div>
                <p className="text-sm text-gray-400">Package Details</p>
                <p className="font-medium">{order.package.size} - {order.package.description}</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 