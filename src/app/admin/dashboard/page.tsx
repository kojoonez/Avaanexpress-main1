'use client'

import { useState } from 'react'
import { DataTable } from '@/components/admin/DataTable'
import { OrderDetails } from '@/components/admin/OrderDetails'
import { ChatPanel } from '@/components/admin/ChatPanel'
import { RiderMap } from '@/components/admin/RiderMap'

interface Order {
  id: string
  restaurant: string
  customer: string
  rider: string
  status: string
  total: string
  items: Array<{
    name: string
    quantity: number
    price: string
  }>
  location: {
    lat: number
    lng: number
  }
}

interface Column {
  id: string
  header: string
  cell?: (row: Order) => React.ReactNode
}

// Sample data - Replace with actual API calls
const orders: Order[] = [
  {
    id: '#ORD-001',
    restaurant: 'Burger King',
    customer: 'John Doe',
    rider: 'Mike Smith',
    status: 'In Progress',
    total: '$25.99',
    items: [
      { name: 'Whopper', quantity: 2, price: '$11.99' },
      { name: 'Fries', quantity: 1, price: '$3.99' }
    ],
    location: { lat: 51.5074, lng: -0.1278 }
  }
]

export default function AdminDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowMap(false)
    setShowChat(false)
  }

  const handleUnassign = async (order: Order) => {
    // Implement unassign logic here
    console.log('Unassigning order:', order.id)
  }

  const columns: Column[] = [
    { id: 'id', header: 'Order ID' },
    { id: 'restaurant', header: 'Restaurant' },
    { id: 'customer', header: 'Customer' },
    { id: 'rider', header: 'Rider' },
    { id: 'status', header: 'Status' },
    { id: 'total', header: 'Total' },
    { 
      id: 'actions',
      header: 'Actions',
      cell: (row: Order) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleViewDetails(row)}
            className="px-3 py-1 text-sm bg-primary-blue text-white rounded-md hover:bg-secondary-blue"
          >
            View
          </button>
          <button 
            onClick={() => handleUnassign(row)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Unassign
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Order Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Table */}
          <div className="lg:col-span-2 bg-card-background rounded-lg p-6">
            <DataTable
              data={orders}
              columns={columns}
            />
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {selectedOrder && (
              <div className="bg-card-background rounded-lg p-6">
                <OrderDetails 
                  order={selectedOrder}
                  onShowLocation={() => setShowMap(true)}
                  onStartChat={(type) => setShowChat(true)}
                />
              </div>
            )}

            {showMap && selectedOrder && (
              <div className="bg-card-background rounded-lg p-6 h-[400px]">
                <RiderMap 
                  location={selectedOrder.location}
                  orderId={selectedOrder.id}
                />
              </div>
            )}

            {showChat && selectedOrder && (
              <div className="bg-card-background rounded-lg p-6">
                <ChatPanel
                  orderId={selectedOrder.id}
                  onClose={() => setShowChat(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 