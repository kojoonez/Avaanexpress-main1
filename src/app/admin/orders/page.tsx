'use client'

import { useState } from 'react'
import { DataTable } from '@/components/admin/DataTable'
import { OrderDetailsExpanded } from '@/components/admin/OrderDetailsExpanded'

const columns = [
  { id: 'id', header: 'Order ID', width: 130 },
  { id: 'customer', header: 'Customer', width: 180 },
  { id: 'restaurant', header: 'Restaurant', width: 180 },
  { id: 'status', header: 'Status', width: 130 },
  { id: 'total', header: 'Total', width: 100 },
  { id: 'createdAt', header: 'Created At', width: 180 },
]

const mockOrders = [
  {
    id: 'ORD001',
    customer: 'John Doe',
    restaurant: 'Burger Palace',
    status: 'In Progress',
    total: '$25.99',
    createdAt: '2024-05-24 10:30 AM',
  },
  {
    id: 'ORD002',
    customer: 'Jane Smith',
    restaurant: 'Pizza Hub',
    status: 'Delivered',
    total: '$35.50',
    createdAt: '2024-05-24 10:15 AM',
  },
  {
    id: 'ORD003',
    customer: 'Mike Johnson',
    restaurant: 'Sushi Express',
    status: 'Pending',
    total: '$42.75',
    createdAt: '2024-05-24 10:00 AM',
  },
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter orders based on status and search query
  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg bg-card-background text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-card-background text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-card-background rounded-lg overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredOrders}
          onRowClick={(id: string) => setSelectedOrder(id)}
        />
      </div>

      {/* Expanded Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsExpanded
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  )
} 